import React from 'react';
import agent from '../agent';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

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
//
class Login extends React.Component {
    constructor() {
        super();
        this.changeEmail = ev => this.props.onChangeEmail(ev.target.value);
        this.changePassword = ev => this.props.onChangePassword(ev.target.value);
        this.submitForm = (email, password) => ev => {
            ev.preventDefault();
            this.props.onSubmit(email, password);
        };
    }

    componentWillUnmount() {
        this.props.onUnload();
    }

    render() {
        const email = this.props.email;
        const password = this.props.password;

        return (
            <div>
                <h1>Login</h1>
                <form onSubmit={this.submitForm(email, password)}>
                    <TextField
                        hintText="Email"
                        type="email"
                        value={this.props.email}
                        onChange={this.changeEmail}
                    /><br />
                    <TextField
                        hintText="Password"
                        type="password"
                        value={this.props.password}
                        onChange={this.changePassword}
                    /><br />
                    <RaisedButton type="submit" label="Login" />
                </form>
            </div>
        );



    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
