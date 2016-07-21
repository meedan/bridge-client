import React, { Component, PropTypes } from 'react';
import BridgeSelect from './BridgeSelect';
import Source from './Source';
import BackBar from './BackBar';

class SavePost extends Component {
  render() {
    const { loginTwitter, loginFacebook, goBack, savePost, submitPost, saveTranslation, submitTranslation, myTranslations, state } = this.props;
    return (
      <div className="main container">
        <BackBar goBack={goBack} myTranslations={myTranslations} />
        <Source post={state.bridge.post} />
        <div className="form-container">
          <form className="translation-container">
            
            <div className="form-group project">
              <BridgeSelect title="Choose Project:" name="project" objects={state.extension.projects} />
            </div>
            
            <div className="form-group language clearfix">
              <div className="source">
                <BridgeSelect title="Source Language:" name="language" objects={state.extension.sourcelanguages} multi={true} />
              </div>
            </div>
            
            <ul className="submit list-inline">
              <li><a className="btn add-translation" onClick={saveTranslation.bind(this)}>Add Translation</a></li>
              <li className="pull-right">
                <a onClick={submitPost.bind(this)} className="btn add-queue">Add to Queue</a>
              </li>
            </ul>
          </form>
        </div>
      </div>
    );
  }
}

export default SavePost;
