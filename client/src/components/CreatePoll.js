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
    onSubmit: (title, options) => {
        const payload = agent.Polls.create(title, options);
        //console.log(CREATE_POLL);
        dispatch({ type: CREATE_POLL, payload });
    }
});
//
class CreatePoll extends React.Component {
    constructor() {
        super();
        this.state = {
            title: '',
            options: ['', '']
        };
    }

    submitForm = () => ev => {
        ev.preventDefault();
        //console.log("submit");
        // use the agent
        this.props.onSubmit(this.state.title,this.state.options);
    }

    changeTitle = ev => {
        this.setState({ title: ev.target.value });
    }

    changeOption = i => ev => {
        //console.log('changeOption', i);
        const o = this.state.options;
        this.setState({ options: [...o.slice(0, i), ev.target.value, ...o.slice(i + 1)] });
    }

    addOption = () => {
        this.setState({ options: this.state.options.concat('') });
    }

    removeOption = (i) => () => {
        //console.log('removeOption', i);
        const o = this.state.options;
        this.setState({ options: [...o.slice(0, i), ...o.slice(i + 1)] });
    }

    render() {
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
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePoll);
