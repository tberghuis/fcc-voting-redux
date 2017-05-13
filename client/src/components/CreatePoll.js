import React from 'react';
import agent from '../agent';
import { connect } from 'react-redux';
import { Form } from 'semantic-ui-react';


import {
    CREATE_POLL
} from '../constants/actionTypes';

// const mapStateToProps = state => ({ ...state.forms.createPoll });
const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    // onChangePassword: value =>
    //     dispatch({ type: UPDATE_FIELD_AUTH, key: 'password', value }),
    // onChangeEmail: value =>
    //     dispatch({ type: UPDATE_FIELD_AUTH, key: 'email', value }),

    // onUnload: () =>
    //     dispatch({ type: LOGIN_PAGE_UNLOADED })

    onSubmit: (title, options) => {
        const payload = agent.Polls.create(title, options);
        dispatch({ type: CREATE_POLL, payload });
    }
});
//
class CreatePoll extends React.Component {
    constructor() {
        super();
        // this.changeEmail = ev => this.props.onChangeEmail(ev.target.value);
        // this.changePassword = ev => this.props.onChangePassword(ev.target.value);


        this.state = {
            title: '',
            options: ['', '']
        };

    }

    submitForm = () => ev => {
        ev.preventDefault();
        //this.props.onSubmit(email, password);
        console.log("submit");

        // use the agent
        this.props.onSubmit(this.state.title,this.state.options);

    }

    changeTitle = ev => {
        //this.props.onChangeEmail(ev.target.value);

        this.setState({ title: ev.target.value });
    }

    changeOption = i => ev => {

        console.log('changeOption', i);
        const o = this.state.options;

        this.setState({ options: [...o.slice(0, i), ev.target.value, ...o.slice(i + 1)] });

        //this.props.onChangeEmail(ev.target.value);

        // const options = this.state.options;
        // options[i] = ev.target.value;

        // // update state
        // this.setState({
        //     options,
        // });


        // this.setState({ title: ev.target.value });
    }

    addOption = () => {
        //this.props.onChangeEmail(ev.target.value);

        this.setState({ options: this.state.options.concat('') });
    }

    removeOption = (i) => () => {
        // const data = this.state.data;
        // this.setState({
        //     data: [...data.slice(0, index), ...data.slice(index + 1)]
        // });

        console.log('removeOption', i);


        const o = this.state.options;

        this.setState({ options: [...o.slice(0, i), ...o.slice(i + 1)] });
    }

    render() {

        // generateOptionInputs


        let optionInputs = this.state.options.map((option, i) => {
            return (
                <Form.Group key={i} >
                    <input placeholder={'Option ' + (i + 1)}
                        onChange={this.changeOption(i)}
                        value={this.state.options[i]}
                    />
                    {(this.state.options.length > 2) &&
                        <Form.Button
                            type="button"
                            onClick={this.removeOption(i)}
                        >X</Form.Button>
                    }

                </Form.Group>
            );
        });


        return (
            <div>
                <h1>New Poll</h1>
                <Form onSubmit={this.submitForm()}>
                    <Form.Input label='Title' placeholder='Title'
                        value={this.state.title}
                        onChange={this.changeTitle}
                    />
                    <Form.Field>
                        <label>Options</label>
                        {optionInputs}
                    </Form.Field>
                    <Form.Button
                        type="button"
                        onClick={this.addOption}>Add Option</Form.Button>
                    <Form.Button>Submit</Form.Button>
                </Form>
                {/*<form onSubmit={this.submitForm()}>
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
                </form>*/}
            </div>
        );



    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePoll);
