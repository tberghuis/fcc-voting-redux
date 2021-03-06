import React from 'react';
import agent from '../agent';
import { connect } from 'react-redux';
import { Form, Container } from 'semantic-ui-react';

import {
    CREATE_POLL
} from '../constants/actionTypes';

// component only need local state, using setState
const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    onSubmit: (title, options) => {
        const payload = agent.Polls.create(title, options);
        dispatch({ type: CREATE_POLL, payload });
    }
});

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

        if (!this.isValidForm()) {
            return;
        }
        this.props.onSubmit(this.state.title, this.state.options);
    }

    changeTitle = ev => {
        this.setState({ title: ev.target.value });
    }

    changeOption = i => ev => {
        const o = this.state.options;
        this.setState({ options: [...o.slice(0, i), ev.target.value, ...o.slice(i + 1)] });
    }

    addOption = () => {
        this.setState({ options: this.state.options.concat('') });
    }

    removeOption = (i) => () => {
        const o = this.state.options;
        this.setState({ options: [...o.slice(0, i), ...o.slice(i + 1)] });
    }

    isValidForm = () => {
        if (this.state.title.trim() === '') {
            return false;
        }

        // must be a simpler way to write this
        let optionEmpty = () => {
            let empty = false;
            this.state.options.forEach(function (element) {
                if (element.trim() === '') {
                    empty = true;
                }
            });
            return empty;
        }

        if (optionEmpty()) {
            return false;
        }
        return true;
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
                Create Poll
                <Container text>
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
                        <Form.Button
                            disabled={!this.isValidForm()}
                        >Submit</Form.Button>
                    </Form>
                </Container>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePoll);
