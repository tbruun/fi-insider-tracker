import React, {Component} from 'react';
import {Button, Grid, Snackbar, TextField} from "material-ui";
import Api from '../../service/API'
import PropTypes from 'prop-types';

class SubscribeForm extends Component {
  state = {
    email: '',
    toastOpen: false,
  };

  handleSubmit(e) {
    e.preventDefault();
    Api.addSubscription(this.props.queryTerm, this.state.email, (err, response) => {
      this.setState({toastOpen: true, email: ''});
    })
  }

  render() {
    return (
      <div style={{ marginTop: 24 }}>
        <div style={{ width: 400, margin: '0 auto'}}>
          <form noValidate autoComplete="off" onSubmit={(e) => this.handleSubmit(e)}>
            <TextField
              id="email"
              label="Email Address"
              style={{marginRight: 11, width: 270, boxSizing: 'border-box'}}
              value={this.state.email}
              onChange={(val) => this.setState({email: val.target.value})}
              margin="normal"
            />
            <Button raised color="accent" onClick={(e) => this.handleSubmit(e)}>Subscribe</Button>
          </form>
          <Snackbar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            open={this.state.toastOpen}
            autoHideDuration={6000}
            onRequestClose={() => this.setState({toastOpen: false})}
            message={<span id="message-id">Subscription added for: {this.props.queryTerm}</span>}
          />
        </div>
      </div>
    )
  }
}

SubscribeForm.propTypes = {
  queryTerm: PropTypes.string.isRequired
};
SubscribeForm.defaultProps = {};

export default SubscribeForm;