import React, { Component } from 'react';
import './Login.scss';
import { Redirect } from 'react-router-dom';
import Swal from 'sweetalert2';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';

function mapStateToProps(state) {
  return {
    token: state.authentication,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    logIn: (token) => dispatch(actions.logIn(token)),
  };
}
class Login extends Component {
  constructor(props) {
    super(props);
    this.loginHandler = this.loginHandler.bind(this);
    this.registerHandler = this.registerHandler.bind(this);
    this.emailInputHandler = this.emailInputHandler.bind(this);
    this.passwordInputHandler = this.passwordInputHandler.bind(this);
    this.state = {
      email: '',
      password: '',
    };
  }

  emailInputHandler(event) {
    this.setState({
      email: event.target.value,
    });
  }

  passwordInputHandler(event) {
    this.setState({
      password: event.target.value,
    });
  }

  loginHandler(event) {
    event.preventDefault();
    const url = 'http://localhost:3001/login';
    const {
      email,
      password,
    } = this.state;
    const {
      logIn,
    } = this.props;

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }).then((response) => response.json()).then((jsonResponse) => {
      const { token } = jsonResponse;
      if (!token) {
        Swal.fire('Error', 'Unable to log in', 'error');
        return;
      }
      sessionStorage.setItem('token', token);
      logIn(token);
    }).catch((err) => {
      Swal.fire('Error', `Error logging in, error: ${err.message}`, 'error');
    });
  }

  registerHandler() {
    const url = 'http://localhost:3001/register';
    const {
      email,
      password,
    } = this.state;
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }).then((response) => response.json()).then((jsonResponse) => {
      const receivedMail = jsonResponse.email;
      if (!receivedMail) {
        Swal.fire('Error', 'Error registering user', 'error');
        return;
      }
      Swal.fire('Success!', `User ${receivedMail} registered successfully`, 'success');
    }).catch((err) => {
      Swal.fire('Error', `Error registering, error: ${err.message}`, 'error');
    });
  }

  render() {
    const { token } = this.props;
    if (token) {
      return (
        <Redirect to="/" />
      );
    }
    return (
      <div className="login-container">
        <form onSubmit={this.loginHandler} className="login">
          <div className="title">Bookshelf</div>
          <label className="email-label" htmlFor="email">
            Email
            <input onChange={this.emailInputHandler} id="email" type="email" className="email-input" />
          </label>
          <label className="password-label" htmlFor="password">
            Password
            <input onChange={this.passwordInputHandler} id="password" type="password" className="password-input" />
          </label>
          <input type="submit" className="submit-button" value="Log in" />
          <input type="button" onClick={this.registerHandler} className="submit-button" value="Register" />
        </form>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);

Login.propTypes = {
  logIn: PropTypes.func.isRequired,
  token: PropTypes.string,
};

Login.defaultProps = {
  token: '',
};
