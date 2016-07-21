import React, { Component, PropTypes } from 'react';
import BackBar from './BackBar';
import Source from './Source';
import TranslationToolbar from './TranslationToolbar';

class ListTranslations extends Component {
  render() {
    const { loginTwitter, loginFacebook, goBack, savePost, submitPost, saveTranslation, submitTranslation, myTranslations, deleteTranslation, editTranslation, state } = this.props;
    const translation = state.bridge.translation;
    return (
      <div id="my-translations" className="main container">
        <BackBar goBack={goBack} myTranslations={myTranslations} />
        
        <TranslationToolbar translation={translation} myTranslations={myTranslations} deleteTranslation={deleteTranslation} editTranslation={editTranslation} />
        
        <div className="embed-container">
          <h1>Source (from <i>{translation.post.author.name}</i> on <i>{translation.post.provider}</i>)</h1>
          <p className={translation.post.lang}>{translation.post.text}</p>
          <nav className="source-nav">
            <ul className="list-inline">
              <li><a href={translation.source_url} target="_blank">See on <i>{translation.post.provider}</i></a></li>
            </ul>
          </nav>
        </div>
        
        <p>&nbsp;</p>

        <div className="embed-container">
          <h1>Translation</h1>
          <p className={translation.lang}>{translation.translation}</p>
          <p className={translation.lang}><em>{translation.annotation}</em></p>
          <nav className="source-nav">
            <ul className="list-inline">
              <li><a href={translation.link} target="_blank">See on Bridge Reader</a></li>
            </ul>
          </nav>
        </div>

      </div>
    );
  }
}

export default ListTranslations;
