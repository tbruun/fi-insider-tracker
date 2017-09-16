import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Api from '../../service/API'
import Autosuggest from 'react-autosuggest';
import './CompanyNameSearch.css';

class CompanyNameSearch extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      suggestions: [],
      isLoading: false
    };
  }

  loadSuggestions(input) {
    this.setState({isLoading: true});
    Api.lookup(input, (res) => {
      this.setState({
        isLoading: false,
        suggestions: res.results
      });
    })
  }

  onChange = (event, {newValue}) => {
    this.setState({
      value: newValue
    }, () => this.props.onChange(newValue));
  };

  onSuggestionsFetchRequested = ({value}) => {
    if (value.length > 2)
      this.loadSuggestions(value);
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const {value, suggestions, isLoading} = this.state;
    const inputProps = {
      placeholder: "Company name",
      value,
      onChange: this.onChange
    };

    return (
      <div>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={(suggestion) => suggestion}
          renderSuggestion={(suggestion) =>  <span>{suggestion}</span>}
          inputProps={inputProps}/>
        {
          isLoading &&
            <div className="status">
              <strong>Loading...</strong>
            </div>
        }
      </div>
    );
  }
}

CompanyNameSearch.propTypes = {
  onChange: PropTypes.func
};

CompanyNameSearch.defaultProps = {};

export default CompanyNameSearch;