import React, { Component, PropTypes } from 'react';

class Source extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true
    };
  }

  handleShow() {
    this.setState({ show: true });
  }

  handleHide() {
    this.setState({ show: false });
  }

  render() {
    const p = this.props.post;
    if (!p || !p.author || !p.provider || !p.text || !p.languages) {
      return(
        <div className="embed-container">
          <div className="embed">
            <h1>Could not parse this link, please try again later</h1>
          </div>
        </div>
      );
    }
    else {
      var lang = ''
      if (p.languages.length > 0) {
        lang = p.languages[0].replace(/_.*$/, '');
      }
      return (
        <div className="embed-container">
          <div className={this.state.show ? 'embed' : 'hidden embed'}>
            <h1><i>{p.author.name}</i> <span>on</span> <i>{p.provider}</i></h1>
            <p className={lang}>{p.text}</p>
          </div>
          <nav className="source-nav">
            <ul className="list-inline">
              <li className={this.state.show ? '' : 'hidden'}><a onClick={this.handleHide.bind(this)}>Hide source</a></li>
              <li className={this.state.show ? 'hidden' : ''}><a onClick={this.handleShow.bind(this)}>Show source</a></li>
            </ul>
          </nav>
        </div>
      );
    }
  }
}

export default Source;
