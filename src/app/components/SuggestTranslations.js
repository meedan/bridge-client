import React, { Component, PropTypes } from 'react';
import Autosuggest from 'react-autosuggest';
import superagent from 'superagent';
import config from '../config/config.js';

function searchAlegre(text) {
   var languages2;
   superagent.get('http://localhost:3004/api/prediction/predict') // Need to add url and token on config
   .query('json=%7B%22text%22%3A%22'+ text + '%22%2C%22language_text%22%3A%22en%22%2C%22language_from%22%3A%22pt%22%2C%20%22context%22%3A%7B%22provider%22%3A%22translation%22%7D%7D')
   .query('number_suggestions=3')
   .set('X-Alegre-Token', '34195957c7ac7b2d4e162881210eeff4')
   .set('Content-Type', 'application/json')
   .end(function(err, response){
     if (err || !response.ok) {
       alert(err + ' ' + response.text);
     } else {
       console.log('Web Server started, waiting for connections...');
       languages2 = response.body.data
       console.log(languages2)
       return languages2;
     }
   });
   console.log(languages2);
}

// Teach Autosuggest how to calculate suggestions for any given input value.
function getSuggestions(value) {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

console.log('no get');
console.log(searchAlegre(inputValue));
  return inputLength === 0 ? [] : searchAlegre(inputValue).filter(sug => sug.toLowerCase().slice(0, inputLength) === inputValue );
}

// When suggestion is clicked, Autosuggest needs to populate the input field
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
function getSuggestionValue(suggestion) {
  return suggestion;
}

// Use your imagination to render suggestions.
function renderSuggestion(suggestion) {
  return (
    <span>{suggestion}</span>
  );
}

function shouldRenderSuggestions(value) {
  return value.trim().length > 4;
}

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

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  // Autosuggest will call this function every time you need to update
  // suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
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
      placeholder: 'Type Alice',
      value,
      onChange: this.onChange
    };

    // Finally, render it!
    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        shouldRenderSuggestions={shouldRenderSuggestions}
        inputProps={inputProps} />
    );
  }
}

export default SuggestTranslations;
