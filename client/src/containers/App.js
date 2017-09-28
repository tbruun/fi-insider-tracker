import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import CompanyNameSearch from "../components/input/CompanyNameSearch";
import Api from "../service/API";
import ResultTable from "../components/ResultTable";

class App extends Component {
  state = {
    companyName: '',
    result: []
  };

  fetchTransactions() {
    Api.getTransactions(this.state.companyName, (res) => {
      this.setState({ result: res.results })
    });
  };

  render() {
    return (
      <div style={{ marginTop: 24 }}>
        <div style={{width: 400, margin: '0 auto' }}>
          <form noValidate autoComplete="off" onSubmit={(e) => {e.preventDefault(); this.fetchTransactions();}}>
        <Grid container>
          <Grid item>
            <CompanyNameSearch onChange={(companyName) => this.setState({companyName})}/>
          </Grid>
          <Grid item>
            <Button raised color="primary" onClick={() => this.fetchTransactions()}>Search</Button>
          </Grid>
        </Grid>
          </form>
        </div>
        <div style={{marginTop: 24}}>
          {
            this.state.result.length > 0 &&
              <ResultTable data={this.state.result}/>
          }
        </div>
      </div>
    );
  }
}

export default App;
