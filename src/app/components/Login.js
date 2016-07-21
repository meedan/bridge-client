import React, { Component, PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  loginWithFacebook() {
    this.setState({ loading: true });
    this.props.loginFacebook();
  }

  loginWithTwitter() {
    this.setState({ loading: true });
    this.props.loginTwitter();
  }

  render() {
    return (
      <div className="main logged-out container">
        <div className="logo-and-slogan">
          <img src="/images/logo.png" className="logo" />
          <p className="slogan">Translate the Global Web</p>
        </div>
        <p className={this.state.loading ? 'loader' : 'hidden loader'}>Parsing your post...</p>
        <ul className={this.state.loading ? 'hidden social-login' : 'social-login'}>
          <li><a onClick={this.loginWithFacebook.bind(this)} className="facebook"><FontAwesome name="facebook" /> Log in with Facebook</a></li>
          <li><a onClick={this.loginWithTwitter.bind(this)} className="twitter"><FontAwesome name="twitter" /> Log in with Twitter</a></li>
        </ul>
      </div>
    );
  }
}

export default Login;
