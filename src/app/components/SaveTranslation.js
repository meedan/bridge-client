import React, { Component, PropTypes } from 'react';
import BridgeSelect from './BridgeSelect';
import Source from './Source';
import BackBar from './BackBar';
import SuggestTranslations from './SuggestTranslations';

class SaveTranslation extends Component {
  onTranslationKey() {
    var field = React.findDOMNode(this.translation),
        url = this.props.state.bridge.url;
    window.storage.set(url + ' translation', field.value);
  }

  onAnnotationFocus() {
    var field = React.findDOMNode(this.annotation);
    if (field.value === 'Add an annotation to your translation') {
      field.value = "";
    }
  }

  onAnnotationKey() {
    var field = React.findDOMNode(this.annotation),
        url = this.props.state.bridge.url;
    window.storage.set(url + ' annotation', field.value);
  }

  getSavedValues() {
    var that = this,
        url = this.props.state.bridge.url;
    
    window.storage.get(url + ' translation', function(value) {
      var field = React.findDOMNode(that.translation);
      if (value != '' && value != undefined) {
        field.value = value;
      }
    });
    
    window.storage.get(url + ' annotation', function(value) {
      var field = React.findDOMNode(that.annotation);
      if (value != '' && value != undefined) {
        field.value = value;
      }
    });
  }

  componentDidMount() {
    this.getSavedValues();
  }

  render() {
    const { loginTwitter, loginFacebook, goBack, savePost, submitPost, saveTranslation, submitTranslation, myTranslations, updateTranslation, state } = this.props;

    return (
      <div className="main container">
        <BackBar goBack={goBack} myTranslations={myTranslations} />
        <div className="content">
          <Source post={state.bridge.post} />
          <div className="form-container">

            <form className="translation-container">
              
              <div className="form-group translate-form">
                <label for="translation">Your Translation</label>
                <textarea name="translation"
                          className="form-control"
                          id="translation"
                          onKeyUp={this.onTranslationKey.bind(this)}
                          ref={(ref) => this.translation = ref}>{state.bridge.translation}</textarea>
              </div>
              
              <div className="form-group translate-form">
                <label for="translation">Your Translation with autocomplete</label>
                <SuggestTranslations />
              </div>

              <div className="form-group annotation">
                <textarea name="annotation" 
                          className="form-control"
                          id="annotation"
                          onFocus={this.onAnnotationFocus.bind(this)} 
                          onKeyUp={this.onAnnotationKey.bind(this)}
                          ref={(ref) => this.annotation = ref}>{state.bridge.annotation || 'Add an annotation to your translation'}</textarea>
              </div>

              {(() => {
                if (state.bridge.action != 'edit') {
                  return (
                    <div>

                      <div className="form-group project">
                        <BridgeSelect title="Choose Project:" name="project" objects={state.extension.projects} />
                      </div>

                      <div className="form-group language clearfix">
                        <div className="source">
                          <BridgeSelect title="Source Language:" name="from" objects={state.extension.sourcelanguages} multi={true} />
                        </div>

                        <div className="target">
                          <BridgeSelect title="Target Language:" name="to" objects={state.extension.targetlanguages} />
                        </div>
                      </div>

                    </div>
                  );
                }
              })()}

              <ul className="submit list-inline">
                <li><a className="btn add-translation-bridge" onClick={state.bridge.action === 'edit' ? updateTranslation.bind(this) : submitTranslation.bind(this)}>Save Translation to Bridge</a> <span className="cancel">or <a onClick={goBack.bind(this)}>cancel</a></span></li>
              </ul>

            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SaveTranslation;
