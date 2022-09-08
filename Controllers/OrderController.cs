using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using OrderManagement.Data;
using OrderManagement.Models;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;

namespace OrderManagement.Controllers
{
    [Authorize]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly SalesmanagementContext _Salescontext;
        private readonly StockManagmenttContext _Stockcontext;
        private readonly ILogger<OrderController> _logger;

        public OrderController(SalesmanagementContext Salescontext, StockManagmenttContext Stockcontext, ILogger<OrderController> logger)
        {
            _Salescontext = Salescontext;
            _Stockcontext = Stockcontext;
            _logger = logger;
        }


        [HttpGet("{id}")]
        [ActionName("GetOrdersByUsers")]
        public IList<Order> GetOrdersByUsers(string id)
        {
            return _Salescontext.Order.Where(o => o.UserId == id).ToList(); 
        }

        [HttpGet]
        [ActionName("GetAvailableProducts")]
        public IList<Products> GetAvailableProducts()
        {
            return _Stockcontext.Products.Where(o => o.AvailableQuantity > 0).ToList();
        }

        [HttpPost]
        public async Task<dynamic> CreateOrder([FromForm] SubmitOrder Ord)
        {
            bool SuccessStatus = true;
            string ModelErrors = "";
            
            using (var trans = _Salescontext.Database.BeginTransaction())
            {
                try
                {
                    var OrderTbl = new Order
                    {
                        OrderNumber = "123",
                        UserId = Ord.UserID,
                        OrderStatus = 1,
                        ShippingAddressId = 1
                    };

                    await _Salescontext.Order.AddAsync(OrderTbl);
                    await _Salescontext.SaveChangesAsync();

                    List<ProductOrder> OrderList = new List<ProductOrder>();
                    List<Products> ProductsLits = new List<Products>();

                    foreach (var item in Ord.OrdDetails)
                    {
                        Array arr = item.Split(",").ToArray();
                        var ProductOrd = new ProductOrder
                        {
                            OrderId = OrderTbl.Id,
                            ProductId = Convert.ToInt32(arr.GetValue(0).ToString()),
                            Quantity = Convert.ToInt32(arr.GetValue(1).ToString()),
                        };
                        OrderList.Add(ProductOrd);

                        var StockProduct = await _Stockcontext.Products.FindAsync(Convert.ToInt32(arr.GetValue(0).ToString()));
                        if (StockProduct != null)
                        {
                            StockProduct.AvailableQuantity = (StockProduct.AvailableQuantity - Convert.ToInt32(arr.GetValue(1).ToString()));
                        }
                        ProductsLits.Add(StockProduct);
                    }

                            await _Salescontext.ProductOrder.AddRangeAsync(OrderList);
                            await _Salescontext.SaveChangesAsync();
                            _logger.LogInformation("Record Successfully inserted.");

                             _Stockcontext.Products.UpdateRange(ProductsLits);
                            await _Stockcontext.SaveChangesAsync();
                    trans.Commit();
                }
                catch (DbUpdateException ex)
                {
                    SuccessStatus = false;
                    ModelErrors = ex.InnerException.Message;
                    trans.Rollback();
                }
            }
            return new { Success = SuccessStatus, ModelErrors };
        }

    }
}
