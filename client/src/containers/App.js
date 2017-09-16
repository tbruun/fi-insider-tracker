import React, { Component } from 'react';
import CompanyNameSearch from "../components/input/CompanyNameSearch";
import Api from "../service/API";

class App extends Component {
  state = {
    companyName: ''
  };

  fetchTransactions() {
    Api.getTransactions(this.state.companyName, (res) => {
      console.log('res', res);
    });
  };

  render() {
    return (
      <div>
        <CompanyNameSearch onChange={(companyName) => this.setState({companyName})}/>
        <button onClick={() => this.fetchTransactions()}>Search</button>
      </div>
    );
  }
}

export default App;
