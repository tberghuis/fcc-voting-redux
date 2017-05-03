import React, { Component } from 'react';

class Login extends Component {


    constructor() {
        super();

    }

    loginFacebook = () => {
        alert('login facebook');
    };

    componentWillMount() {

    }

    componentWillUnmount() {

    }

    render() {
        return (
            <div>
                Login page

                <button
                    onClick={this.loginFacebook}
                    >Login with facebook
                </button>
            </div>
        );
    }
}

export default Login;
