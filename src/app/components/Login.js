import React, { Component, PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';

class Login extends Component {
  render() {
    const { loginTwitter, loginFacebook, goBack, savePost, submitPost, saveTranslation, submitTranslation, myTranslations, state } = this.props;

    return (
      <div className="main logged-out container">
        <div className="logo-and-slogan">
          <img src="/images/logo.png" className="logo" />
          <p className="slogan">Translate the Global Web</p>
        </div>
        <ul className="social-login">
          <li><a onClick={loginFacebook} className="facebook"><FontAwesome name="facebook" /> Log in with Facebook</a></li>
          <li><a onClick={loginTwitter} className="twitter"><FontAwesome name="twitter" /> Log in with Twitter</a></li>
        </ul>
      </div>
    );
  }
}

export default Login;
