import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Swal from 'sweetalert2';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ajax } from 'rxjs/ajax';
import * as actions from '../../actions/index';
import {
  LoginContainer,
  EmailInput,
  EmailLabel,
  LoginForm,
  PasswordInput,
  PasswordLabel,
  SubmitButton,
  Title,
} from './Layout';

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
    const {
      email,
      password,
    } = this.state;
    const {
      logIn,
    } = this.props;

    logIn({
      email,
      password,
    });
  }

  registerHandler() {
    const url = 'http://localhost:3001/register';
    const {
      email,
      password,
    } = this.state;

    ajax({
      url: url,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        email,
        password,
      },
    }).subscribe((response) => {
      const receivedMail = response.response.email;
      Swal.fire('Success!', `User ${receivedMail} registered successfully`, 'success');
    }, (err) => {
      const message = err.status !== 204 ? err.response.message : 'No content';
      Swal.fire('Error', `Error registering, error: ${message}`, 'error');
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
      <LoginContainer>
        <LoginForm onSubmit={this.loginHandler}>
          <Title>Bookshelf</Title>
          <EmailLabel htmlFor="email">
            Email
            <EmailInput onChange={this.emailInputHandler} id="email" type="email" />
          </EmailLabel>
          <PasswordLabel htmlFor="password">
            Password
            <PasswordInput onChange={this.passwordInputHandler} id="password" type="password" />
          </PasswordLabel>
          <SubmitButton type="submit" value="Log in" />
          <SubmitButton type="button" onClick={this.registerHandler} value="Register" />
        </LoginForm>
      </LoginContainer>
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
