import React from 'react';
import agent from '../agent';
import { connect } from 'react-redux';
// import TextField from 'material-ui/TextField';
// import RaisedButton from 'material-ui/RaisedButton';

// import {
//     UPDATE_FIELD_AUTH,
//     LOGIN,
//     LOGIN_PAGE_UNLOADED
// } from '../constants/actionTypes';

// const mapStateToProps = state => ({ ...state.forms.createPoll });
const mapStateToProps = state => ({  });

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
        // this.submitForm = (email, password) => ev => {
        //     ev.preventDefault();
        //     this.props.onSubmit(email, password);
        // };
    }


    render() {
      
        return (
            <div>
                createpoll component
            </div>
        );



    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePoll);
