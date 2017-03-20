import React, { Component, PropTypes } from 'react';
import BridgeSelect from './BridgeSelect';
import BackBar from './BackBar';
import PenderCard from './PenderCard';
import config from '../config/config.js';

class SavePost extends Component {
  render() {
    const { loginTwitter, loginFacebook, goBack, savePost, submitPost, saveTranslation, submitTranslation, myTranslations, state } = this.props;
    return (
      <div>
        <BackBar goBack={goBack} myTranslations={myTranslations} />
        <div className="textured">
          <div className="light-gray-background">
            <h3 className="action">Save to existing project for translation</h3>
            <div className="column form-column">
              { state.extension.selection ? <div id="quote">{state.extension.selection}</div> : <PenderCard url={state.extension.url} penderUrl={config.penderUrl} /> }
              <form onSubmit={submitPost.bind(this)}>
                <div>
                  <BridgeSelect name="project" objects={state.extension.projects} />
                  <BridgeSelect name="language" objects={state.extension.sourcelanguages} multi={true} />
                </div>
                <button className="btn btn-large" id="submit">Add to Project</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SavePost;
