import React from 'react';
import agent from '../agent';
import { connect } from 'react-redux';
import { Form, Container } from 'semantic-ui-react'

// TODO figure out why react warning for textfield type email and password

import {
    UPDATE_FIELD_AUTH,
    LOGIN,
    LOGIN_PAGE_UNLOADED
} from '../constants/actionTypes';

const mapStateToProps = state => ({ ...state.auth });

const mapDispatchToProps = dispatch => ({
    onChangePassword: value =>
        dispatch({ type: UPDATE_FIELD_AUTH, key: 'password', value }),
    onChangeEmail: value =>
        dispatch({ type: UPDATE_FIELD_AUTH, key: 'email', value }),
    onSubmit: (email, password) => {
        const payload = agent.Auth.login(email, password);
        dispatch({ type: LOGIN, payload })
    },
    onUnload: () =>
        dispatch({ type: LOGIN_PAGE_UNLOADED })
});

class Login extends React.Component {
    constructor() {
        super();
        this.changeEmail = ev => this.props.onChangeEmail(ev.target.value);
        this.changePassword = ev => this.props.onChangePassword(ev.target.value);
        this.submitForm = (email, password) => ev => {
            ev.preventDefault();
            if(!this.isValidForm()){
                return;
            }
            this.props.onSubmit(email, password);
        };
    }

    componentWillUnmount() {
        this.props.onUnload();
    }

    isValidForm = () => {
        if (this.props.email.trim() === ''
            || this.props.password.trim() === ''
        ) {
            return false;
        }
        return true;
    }

    render() {
        const email = this.props.email;
        const password = this.props.password;

        return (
            <Container text>
                <h1>Login</h1>
                <Form onSubmit={this.submitForm(email, password)}>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
