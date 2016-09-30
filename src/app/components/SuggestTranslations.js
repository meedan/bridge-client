import React, { Component, PropTypes } from 'react';
import Autosuggest from 'react-autosuggest';
import superagent from 'superagent';
import config from '../config/config.js';

class SuggestTranslations extends React.Component {
  constructor() {
    super();

    // Autosuggest is a controlled component.
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest,
    // and they are initially empty because the Autosuggest is closed.
    this.state = {
      value: '',
      suggestions: []
    };
  }

  searchAlegre(text, callback) {
     var languages2;
     superagent.get('http://localhost:3004/api/prediction/predict') // Need to add url and token on config
     .query('json=%7B%22text%22%3A%22'+ text + '%22%2C%22language_text%22%3A%22en%22%2C%22language_from%22%3A%22pt%22%2C%20%22context%22%3A%7B%22provider%22%3A%22translation%22%7D%7D')
     .query('number_suggestions=3')
     .set('X-Alegre-Token', '34195957c7ac7b2d4e162881210eeff4')
     .set('Content-Type', 'application/json')
     .end(callback);
  }

  // Teach Autosuggest how to calculate suggestions for any given input value.
  getSuggestions(value, callback) {
    var suggestions;
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
  
    this.searchAlegre(inputValue, function(err, response) {
      if(err) {
        console.log(err);
        return;
      }
      suggestions =  response.body.data;
      callback(suggestions);
    });
  }

  // When suggestion is clicked, Autosuggest needs to populate the input field
  // based on the clicked suggestion. Teach Autosuggest how to calculate the
  // input value for every given suggestion.
  getSuggestionValue(suggestion) {
    return suggestion;
  }

  // Use your imagination to render suggestions.
  renderSuggestion(suggestion) {
    return (
      <span>{suggestion}</span>
    );
  }

  shouldRenderSuggestions(value) {
    return value.trim().length > 4;
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  // Autosuggest will call this function every time you need to update
  // suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    var self = this;
    self.getSuggestions(value, function(data) {
      self.setState({suggestions: data});
    });
  };

  // Autosuggest will call this function every time you need to clear
  // suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const { value, suggestions } = this.state;

    // Autosuggest will pass through all these props to the input field.
    const inputProps = {
      value,
      onChange: this.onChange
    };

    // Finally, render it!
    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested.bind(this)}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested.bind(this)}
        onSuggestionSelected={this.onSuggestionSelected}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        shouldRenderSuggestions={this.shouldRenderSuggestions}
        inputProps={inputProps} />
    );
  }
}

export default SuggestTranslations;
