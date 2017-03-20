import React, { Component, PropTypes } from 'react';
import BackBar from './BackBar';
import PenderCard from './PenderCard';
import TranslationToolbar from './TranslationToolbar';
import Relay from 'react-relay';
import TranslationsRoute from './TranslationsRoute';
import config from '../config/config.js';
import util from 'util';

const pageSize = 2;

class ListTranslations extends Component {
  constructor(props) {
    super(props);
    this.state = { currentTranslationIndex: 0 };
  }

  getCurrentTranslation() {
    var translations = this.props.me.annotations.edges,
        index = this.state.currentTranslationIndex;

    if (index == translations.length - 1) {
      this.props.relay.setVariables({
        pageSize: translations.length + pageSize
      });
    }

    if (translations == null || translations[index] == null) {
      this.setState({ currentTranslationIndex: index - 1 });
    }
   
    var translation = translations[index].node;
    translation.index = index;
    return translation;
  }

  goToTranslation(step) {
    var index = this.state.currentTranslationIndex + step;
    if (index < 0) {
      index = 0;
    }
    this.setState({ currentTranslationIndex: index });
  }

  render() {
    var translation = this.getCurrentTranslation(),
        fields = JSON.parse(translation.content),
        media = translation.project_media.media;

    var to, text, comment;
    for (var i = 0; i < fields.length; i++) {
      switch (fields[i].field_name) {
        case 'translation_text':
          text = fields[i].value;
          break;
        case 'translation_language':
          to = fields[i].value;
          break;
        case 'translation_note':
          comment = fields[i].value;
          break;
      }
    }

    return (
      <div className="translation">
        <TranslationToolbar translation={translation} goToTranslation={this.goToTranslation.bind(this)} />
        { media.quote ? <div id="quote">{media.quote}</div> : <PenderCard url={media.url} penderUrl={config.penderUrl} /> }
        <p className="translation-languages">Translated to {to}</p>
        <p>{text}</p>
        <em>{comment}</em>
      </div>
    );
  }
}

const ListTranslationsContainer = Relay.createContainer(ListTranslations, {
  initialVariables: {
    pageSize: pageSize,
    type: 'translation'
  },
  fragments: {
    me: () => Relay.QL`
      fragment on User {
        id,
        name,
        annotations(first: $pageSize, type: $type) {
          edges {
            node {
              id,
              content,
              project_media {
                media {
                  quote,
                  url
                }
              }
            }
          }
        }
      }
    `
  }
});

class ListTranslationsScreen extends Component { 
  render() {
    var route = new TranslationsRoute();

    return (
      <div id="my-translations">
        <BackBar goBack={this.props.goBack} myTranslations={this.props.myTranslations} />
        <div className="textured">
          <div className="light-gray-background">
            <h3 className="action">My Translations</h3>
            <div className="column form-column">
              <Relay.RootContainer Component={ListTranslationsContainer} route={route} forceFetch={true} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ListTranslationsScreen;
