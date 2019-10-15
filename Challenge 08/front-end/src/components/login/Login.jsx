import React, { Component } from 'react';
import './Login.scss';
import { Redirect } from 'react-router-dom';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.loginHandler = this.loginHandler.bind(this);
    this.registerHandler = this.registerHandler.bind(this);
    this.emailInputHandler = this.emailInputHandler.bind(this);
    this.passwordInputHandler = this.passwordInputHandler.bind(this);
    this.state = {
      email: '',
      password: '',
      loggedIn: false,
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
        alert('Unable to log in');
        return;
      }
      sessionStorage.setItem('token', token);
      this.setState({
        loggedIn: true,
      });
    }).catch((err) => {
      alert(`Error logging in, error: ${err.message}`);
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
        alert('Error registering user');
        return;
      }
      alert(`User ${receivedMail} registered successfully`);
    }).catch((err) => {
      alert(`Error registering, error: ${err.message}`);
    });
  }

  render() {
    const { loggedIn } = this.state;
    const token = sessionStorage.getItem('token');
    if (loggedIn || token) {
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
