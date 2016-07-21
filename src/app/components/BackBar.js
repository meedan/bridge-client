import React, { Component, PropTypes } from 'react';

class BackBar extends Component {
  loadTranslations() {
    this.props.myTranslations(0);
  }

  render() {
    return (
      <header className="back-bar">
        <nav>
          <ul>
            <li><a onClick={this.loadTranslations.bind(this)} id="my-translations-link">My Translations</a></li>
          </ul>
          <div className="close-screen" onClick={this.props.goBack}>Close</div>
        </nav>
      </header>
    );
  }
}

export default BackBar;
