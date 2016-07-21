import React, { Component, PropTypes } from 'react';
import BackBar from './BackBar';

class Message extends Component {
  render() {
    const { loginTwitter, loginFacebook, goBack, savePost, submitPost, saveTranslation, submitTranslation, myTranslations, state } = this.props;
    const message = state.bridge.message.replace(/<\/?h[^>]+>/g, ' ');
    return (
      <div className="main container">
        <BackBar goBack={goBack} myTranslations={myTranslations} />

        <div className="content">
          <div className="embed-container">
            <h1 dangerouslySetInnerHTML={{__html: message}}></h1>
            <p><a className="btn" onClick={goBack}>Done</a></p>
          </div>
        </div>
      </div>
    );
  }
}

export default Message;
