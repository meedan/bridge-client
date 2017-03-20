import React, { Component, PropTypes } from 'react';
import BridgeSelect from './BridgeSelect';
import BackBar from './BackBar';
import PenderCard from './PenderCard';
import config from '../config/config.js';

class SaveTranslation extends Component {
  onTranslationFocus() {
    var field = React.findDOMNode(this.translation)
    if (field.value === 'Enter your translation here') {
      field.value = "";
    }
    field.style.backgroundColor = '#F4F4F4';
  }

  onTranslationBlur() {
    var field = React.findDOMNode(this.translation);
    field.style.backgroundColor = '#FFF';
  }

  onTranslationKey() {
    var field = React.findDOMNode(this.translation),
        url = this.props.state.bridge.url;
    window.storage.set(url + ' translation', field.value);
  }

  onAnnotationFocus() {
    var field = React.findDOMNode(this.annotation);
    if (field.value === 'Enter your annotation here') {
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
      <div>
        <BackBar goBack={goBack} myTranslations={myTranslations} />
        <div className="textured">
          <div className="light-gray-background">
            <h3 className="action">Translate this post</h3>
            <div className="column form-column" id="translation-form">
              { state.extension.selection ? <div id="quote">{state.extension.selection}</div> : <PenderCard url={state.bridge.url} penderUrl={config.penderUrl} /> }
              <form onSubmit={state.bridge.action === 'edit' ? updateTranslation.bind(this) : submitTranslation.bind(this)}>
                
                <label for="translation">Translation</label>

                <textarea name="translation"
                          id="translation"
                          onFocus={this.onTranslationFocus.bind(this)} 
                          onBlur={this.onTranslationBlur.bind(this)} 
                          onKeyUp={this.onTranslationKey.bind(this)}
                          ref={(ref) => this.translation = ref}>{state.bridge.translation || 'Enter your translation here'}</textarea>

                <label for="annotation">Annotation</label>

                <textarea name="annotation" 
                          id="annotation"
                          onFocus={this.onAnnotationFocus.bind(this)} 
                          onKeyUp={this.onAnnotationKey.bind(this)}
                          ref={(ref) => this.annotation = ref}>{state.bridge.annotation || 'Enter your annotation here'}</textarea>
            
                {(() => {
                  if (state.bridge.action != 'edit') {
                    return (
                      <div>
                        <BridgeSelect name="project" objects={state.extension.projects} />
                        <BridgeSelect name="from" objects={state.extension.sourcelanguages} multi={true} />
                        <BridgeSelect name="to" objects={state.extension.targetlanguages} />
                      </div>
                    );
                  }
                })()}
                
                <button className="btn btn-large" id="submit">Save Translation</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SaveTranslation;
