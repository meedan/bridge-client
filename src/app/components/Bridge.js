import React, { Component, PropTypes } from 'react';
import superagent from 'superagent';
import config from '../config/config.js';
import Login from './Login';
import Message from './Message';
import SavePost from './SavePost';
import SaveTranslation from './SaveTranslation';
import ListTranslations from './ListTranslations';

class Bridge extends Component {
  currentProvider(state) {
    var domain = state.extension.url.split('/')[2];
    if (/twitter\.com$/.test(domain)) {
      return 'twitter';
    }
    else if (/facebook\.com$/.test(domain)) {
      return 'facebook';
    }
    else {
      return null;
    }
  }

  pageSupported(state) {
    if (!/(facebook|twitter)\.com$/.test(state.extension.url.split('/')[2])) {
      state.bridge.message = '<h1>Oops - right now, Bridge only works with posts from Twitter or Facebook. Try again?</h1>';
      return false;
    }
    return true;
  }

  loggedIn(state, savePost) {
    var that     = this,
        provider = that.currentProvider(state),
        fail     = function() {
          state.bridge.view = 'login';
          that.forceUpdate();
        },
        success  = function() {
          savePost();
        }

    if (provider === null) {
      fail();
    }

    else if (state && state.bridge && state.bridge.session && state.bridge.session.provider === provider) {
      success();
    }

    else {
      superagent.get(config.bridgeApiBase + '/api/users/' + provider + '_info')
      .end(function(err, response) {
        if (err) {
          fail();
        }
        else if (response.text === 'null') {
          fail();
        }
        else {
          state.bridge.session = JSON.parse(response.text);
          success();
        }
      });
    }
  }

  render() {
    const { loginTwitter, loginFacebook, goBack, savePost, submitPost, saveTranslation, submitTranslation, myTranslations, state } = this.props;

    let view = ((state && state.bridge && state.bridge.view) ? state.bridge.view : 'home');

    switch (view) {
      case 'home':
        this.loggedIn(state, savePost);
        return null;
      case 'message':
        return (<Message {...this.props} />);
      case 'login':
        return (<Login {...this.props} />);
      case 'save_post':
        if (this.pageSupported(state)) {
          return (<SavePost {...this.props} />);
        }
        else {
          return (<Message {...this.props} />);
        }
      case 'save_translation':
        if ((state && state.bridge && state.bridge.action === 'edit') || this.pageSupported(state)) {
          return (<SaveTranslation {...this.props} />);
        }
        else {
          return (<Message {...this.props} />);
        }
      case 'list_translations':
        return (<ListTranslations {...this.props} />);
      default:
        return null;
    }
  }
}

Bridge.propTypes = {
  state: PropTypes.object.isRequired
};

export default Bridge;
