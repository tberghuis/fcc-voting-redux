import React from 'react';
import agent from '../agent';
import { connect } from 'react-redux';


// import {
//     UPDATE_FIELD_AUTH,
//     LOGIN,
//     LOGIN_PAGE_UNLOADED
// } from '../constants/actionTypes';

// const mapStateToProps = state => ({ ...state.forms.createPoll });
const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    // onChangePassword: value =>
    //     dispatch({ type: UPDATE_FIELD_AUTH, key: 'password', value }),
    // onChangeEmail: value =>
    //     dispatch({ type: UPDATE_FIELD_AUTH, key: 'email', value }),
    // onSubmit: (email, password) => {
    //     const payload = agent.Auth.login(email, password);
    //     dispatch({ type: LOGIN, payload })
    // },
    // onUnload: () =>
    //     dispatch({ type: LOGIN_PAGE_UNLOADED })
});
//
class CreatePoll extends React.Component {
    constructor() {
        super();
        // this.changeEmail = ev => this.props.onChangeEmail(ev.target.value);
        // this.changePassword = ev => this.props.onChangePassword(ev.target.value);
        this.submitForm = () => ev => {
            ev.preventDefault();
            //this.props.onSubmit(email, password);
            console.log("submit");
            
        };
    }


    render() {

        return (
            <div>
                <h1>New Poll</h1>
                <form onSubmit={this.submitForm()}>
                    Title <TextField
                        hintText="Email"
                        type="email"
                        value={this.props.email}
                        onChange={this.changeEmail}
                    /><br />
                    Option X <TextField
                        hintText="Password"
                        type="password"
                        value={this.props.password}
                        onChange={this.changePassword}
                    /><br />
                    Option X <TextField
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

export default connect(mapStateToProps, mapDispatchToProps)(CreatePoll);
