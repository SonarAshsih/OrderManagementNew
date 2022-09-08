import React, { Component } from 'react';
// import axios from 'axios';
import authService from '../api-authorization/AuthorizeService';
import TableComponent from '../CommonComponents/TableComponent'


export class StockComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hiddenheaders: [true, false, false, false, false, false,true],
            Headers: ["ProductID", "Name", "Image", "SKU", "Quantity Available", "Entry Date" ,"Price"],
            Products:[],
            loading:true,
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
              console.log("Products "+ JSON.stringify(data))
                this.setState({
                    Products: data,
                    loading: false
                });
            }).catch(err => console.log(err)); // fail
    }


    SelectedRow(Row) {

        console.log(JSON.stringify(Row))
        // this.setState({
        //     PreviousCompany: selectedRow.previousCompany,

        // });
    }
    async DeleteStock(selectedRow) {

    }

    async DisplayDetails(selectedRow) {

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
                    DeleteRecord={this.DeleteStock.bind(this)}
                    isDeleteButtonHidden={false}
                    isOpenButtonHidden={false}
                    isDisplayButton={false}
                    DisplayRecord={this.DisplayDetails.bind(this)}
                    AddButtonName ={"Update Stock"}
                    DisplayButtonName ={"Views Details"}
                    DeleteButtonName ={"Remove"}
                />
            );
        return (
            <div>
                <h1>Stock Information</h1>
                {contents}
                <button class="primary" ><i ></i>Add New Product</button>
            </div>
        );
    }
}