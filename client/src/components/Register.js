import React from 'react';
import agent from '../agent';
import { connect } from 'react-redux';
import { Form, Container } from 'semantic-ui-react';

// TODO figure out why react warning for textfield type email and password
// should just rewrite to use refs

import {
  UPDATE_FIELD_AUTH,
  REGISTER,
  REGISTER_PAGE_UNLOADED
} from '../constants/actionTypes';

const mapStateToProps = state => ({ ...state.auth });

const mapDispatchToProps = dispatch => ({
  onChangeEmail: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'email', value }),
  onChangePassword: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'password', value }),
  onChangeUsername: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'username', value }),
  onSubmit: (username, email, password) => {
    const payload = agent.Auth.register(username, email, password);
    dispatch({ type: REGISTER, payload })
  },
  onUnload: () =>
    dispatch({ type: REGISTER_PAGE_UNLOADED })
});

class Register extends React.Component {
  constructor() {
    super();
    this.changeEmail = ev => this.props.onChangeEmail(ev.target.value);
    this.changePassword = ev => this.props.onChangePassword(ev.target.value);
    this.changeUsername = ev => this.props.onChangeUsername(ev.target.value);
    this.submitForm = (username, email, password) => ev => {
      ev.preventDefault();
      if(!this.isValidForm()){
        return;
      }
      this.props.onSubmit(username, email, password);
    }
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  isValidForm = () => {

    // console.log('username',this.props.username);
    // console.log('email',this.props.email);
    // console.log('password',this.props.password);

    if (this.props.username.trim() === ''
      || this.props.email.trim() === ''
      || this.props.password.trim() === ''
    ) {
      return false;
    }
    return true;
  }

  render() {
    const email = this.props.email;
    const password = this.props.password;
    const username = this.props.username;

    return (
      <Container text>
        <h1>Register</h1>
        <Form onSubmit={this.submitForm(username, email, password)}>
          <Form.Input label='Username' placeholder='Username'
            value={this.props.username}
            onChange={this.changeUsername} />
          <Form.Input label='Email' placeholder='Email'
            value={this.props.email}
            onChange={this.changeEmail}
            type="email" />
          <Form.Input label='Password' placeholder='Password'
            type="password"
            value={this.props.password}
            onChange={this.changePassword} />
          <Form.Button
            disabled={!this.isValidForm()}
          >Submit</Form.Button>
        </Form>
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
