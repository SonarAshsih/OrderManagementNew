import React, { Component } from 'react';
 import axios from 'axios';
import authService from '../api-authorization/AuthorizeService';
import TableComponent from '../CommonComponents/TableComponent'
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";


export class OrderComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hiddenheaders: [true, false, true, true, false,true,false],
            Headers: ["ProductID", "Name", "Image", "SKU", "Quantity", "Date" ,"Price"],
            Products:[],
            Carthiddenheaders: [true, false, false,false],
            CartHeaders: ["ProductID", "Name", "Quantity","Price"],
            CartProducts:[],
            loading:true,
            Cartloading:true,
            DisplayCart:false,
            TotalPrice:0,
            ItemCount:0,
        }
        
    }
    async componentDidMount() {
     this.GetProducts();
    }
   
    async GetProducts() {
        const token = await authService.getAccessToken();
        fetch(`api/Order/GetAvailableProducts/`,
        { headers: !token ? {} : { 'Authorization': `Bearer ${token}` } }
        ).then(response => response.json())
            .then(data => {
                this.setState({
                    Products: data,
                    loading: false
                });
            }).catch(err => console.log(err)); // fail
    }

    async RemoveFromCart(Row) {
        this.setState({ Cartloading: true});
        const index = this.state.CartProducts.findIndex((item) => item.ProductId === Row.ProductId);
        if (index > -1) 
            this.state.CartProducts.splice(index, 1);
            this.setState({ Cartloading: false});
            this.calculateTotalPrice();
    }

    async AddtoCart(product) {
        
    let _cartItems = [
         {
            ProductId: product.productId,
            Name: product.name,
            Quantity: 0,
            Price:product.price
        }]
    
        const index = this.state.CartProducts.findIndex((item) => item.ProductId === product.productId);
        if (index > -1) {
            this.state.CartProducts[index].Quantity += 1;
        } else {
            _cartItems[0].Quantity += 1;
            this.setState({ CartProducts: this.state.CartProducts.concat(_cartItems)});
            this.state.ItemCount +=1;
        }
        this.calculateTotalPrice()
    }

    calculateTotalPrice()
    {
        var TotalPrice = 0

        for (var i = 0; i < this.state.CartProducts.length; i++) {
          
            TotalPrice += (this.state.CartProducts[i].Quantity * this.state.CartProducts[i].Price)
        }
        this.setState({ TotalPrice: TotalPrice});
    }

    async SubmitOrder() {
 
        if (!this.validateForm()) return;
        if (!window.confirm("Are you sure you wish to Submit this Order ?")) return;
        const token = await authService.getAccessToken();
        const Order = new FormData();
        Order.append('UserID', 1);

        let AddItems = [];
        for (var i = 0; i < this.state.CartProducts.length; i++) {

            AddItems.push(
                    this.state.CartProducts[i].ProductId,
                    this.state.CartProducts[i].Quantity,
                );
                Order.append('OrdDetails', AddItems);
                AddItems = [];
        }

        axios.post(`api/Order/CreateOrder/`, Order, {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        }).then(result => {
            if (result.data.success) {
                // this.setState({
                //     SuccessMessage: '' + msg + '', ErrorMessage: ''
                // })
                this.CloseCart();
                this.GetProducts();
                this.clearCart();
                window.alert("Order Placed Sucessfully...")
            }
            else
            console.log("success "+ result.data.modelErrors)
                // this.setState({ SuccessMessage: '', ErrorMessage: result.data.modelErrors })

        }).catch(err => console.log(err));
    }

    OpenCart()
    {
    this.setState({ Cartloading : false, DisplayCart : true});
         
    }

    SelectedRow(){}
    
    CloseCart() {
        this.setState({
            DisplayCart: false
        });
    }

    clearCart(){
        this.setState({
            CartProducts: [],
            TotalPrice:0,
            ItemCount:0,
        });
    }

    validateForm() {
        if (this.state.CartProducts.length === 0) {
           window.alert("Carrt is Empty... !")
           return false;
       }
       return true;
    }

  
    render() {
     
        let contents = this.state.loading ? (
            <div className="spinner-border text-black-50" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        ) : (
                <TableComponent
                    dataSource={this.state.Products}
                    selectedRow={this.SelectedRow.bind(this)}
                    hiddenheaders={this.state.hiddenheaders}
                    Columns={this.state.Headers}
                    isDeleteButtonHidden={true}
                    isAddButtonHidden={false}
                    isDisplayButtonHidden={true}
                    AddButtonName ={"Add to cart"}
                    DeleteButtonName ={"Remove"}
                    Add={this.AddtoCart.bind(this)}
                />
            );


            let Cartcontents = this.state.Cartloading ? (
                <div className="spinner-border text-black-50" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            ) : (
                    <TableComponent
                        dataSource={this.state.CartProducts}
                        selectedRow={this.SelectedRow.bind(this)}
                        hiddenheaders={this.state.Carthiddenheaders}
                        Columns={this.state.CartHeaders}
                        DeleteRecord={this.RemoveFromCart.bind(this)}
                        isDeleteButtonHidden={false}
                        isAddButtonHidden={true}
                        isDisplayButtonHidden={true}
                        DeleteButtonName ={"Remove"}
                        DisplayButtonName ={"XXX"}
                    />
                );
            
        return (
            <div>
                <h1>Shop</h1>
                <div>
                    {contents}
                </div>

                <div className="row">
                    <button class="waves-effect waves-light btn red" onClick={this.OpenCart.bind(this)}><i class="fas fa-times m-r-10 font-15"></i>Go to Cart</button>
                </div>
                
                <div className="row">
                   Cart Item(s) : {this.state.ItemCount} 
                </div>


                <div >
            <Dialog
                open={this.state.DisplayCart}
                onClose={this.CloseCart.bind(this)} aria-labelledby="form-dialog-title"
            >
                <DialogTitle>
                    <div> My Cart </div>
                </DialogTitle>
                <DialogContent>

                    <div className="row">
                        {Cartcontents}
                    </div>
                    <div className="row">
                         Total Amout : {this.state.TotalPrice}
                    </div>
                </DialogContent>
                <DialogActions>
                    <button
                        className="waves-effect waves-light btn blue"
                        name="btnOK" onClick={this.SubmitOrder.bind(this)} autoFocus><i class="fas fa-check m-r-10 font-15"></i>
                        Submit Order
                    </button>

                    <button class="waves-effect waves-light btn red" onClick={this.CloseCart.bind(this)}><i class="fas fa-times m-r-10 font-15"></i>Cancel</button>
                </DialogActions>
            </Dialog>
        </div>




            </div>



        );
    }
}