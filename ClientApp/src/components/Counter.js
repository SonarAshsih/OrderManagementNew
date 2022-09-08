import React, { Component } from 'react';
import authService from './api-authorization/AuthorizeService';

export class Counter extends Component {
  static displayName = Counter.name;

  constructor(props) {
    super(props);
    this.state = { 
      currentCount: 0 ,
      Products:[],
      loading:true,
    };
    this.incrementCounter = this.incrementCounter.bind(this);
    // this.ShowOrder = this.ShowOrder.bind(this);
  }

  incrementCounter() {
    this.GetProducts();
    this.setState({
      currentCount: this.state.currentCount + 1
    });
  }

  async ShowOrder(P)
  {
    console.log("Clicked on "+ P.sku);
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


 ShowProducts(Product) {
  return (
    <table className='table table-striped' aria-labelledby="tabelLabel">
      <thead>
        <tr>
          <th>Name</th>
          <th>SKU (C)</th>
          <th>QTY. (F)</th>
        </tr>
      </thead>
      <tbody>
        {Product.map(P =>
          <tr key={P.name}>
            <td>{P.name}</td>
            <td>{P.sku}</td>
            <td>{P.availableQuantity}</td>
            <td><button className="btn btn-primary" onClick={this.ShowOrder.bind(P)}>Increment</button></td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

  render() {
    let contents = this.state.loading
    ? <p><em>Loading...</em></p>
    : this.ShowProducts(this.state.Products);



    return (
      <div>
        <h1>Counter</h1>

        <p>This is a simple example of a React component.</p>

        <p aria-live="polite">Current count: <strong>{this.state.currentCount}</strong></p>

        <button className="btn btn-primary" onClick={this.incrementCounter}>Increment</button>

        <h1 id="tabelLabel" >Weather forecast</h1>
        <p>This component demonstrates fetching data from the server.</p>
        {contents}
      </div>
    );
  }
}
