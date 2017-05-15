import React from 'react';
import agent from '../agent';
import { connect } from 'react-redux';
import { Form, List, Radio, Input, Container } from 'semantic-ui-react';
import { browserHistory } from 'react-router';

import {
    GET_POLL,
    POLL_VOTE
} from '../constants/actionTypes';

const mapStateToProps = state => ({
    poll: { ...state.currentPoll }
});

const mapDispatchToProps = dispatch => ({
    vote: (id, optionIndex, newOption) => {
        const payload = agent.Polls.vote(id, optionIndex, newOption);
        dispatch({ type: POLL_VOTE, payload });
    },
    getPoll: (id) => {
        //use promise middleware
        const payload = agent.Polls.get(id);
        dispatch({ type: GET_POLL, payload });
    }
});
//
class Poll extends React.Component {
    constructor() {
        super();
        this.state = {
            selectedOption: null,
            newOption: ''
        };
    }

    componentWillMount() {
        if (this.props.params.id !== this.props.poll.id) {
            this.props.getPoll(this.props.params.id);
        }
    }

    submitForm = ev => {
        ev.preventDefault();

        // use the agent

        // console.log('submit');
        let poll = this.props.poll;
        this.props.vote(poll.id, this.state.selectedOption, this.state.newOption);
    }

    selectOption = i => () => {
        this.setState({
            selectedOption: i
        });
    }

    changeNewOption = ev => {
        this.setState({
            newOption: ev.target.value
        });
    }

    render() {
        if (!this.props.poll.title) {
            return <div>Loading.....</div>;
        }
        let poll = this.props.poll;
        return (
            <div>
                Poll Vote
                <Container text>
                    <Form onSubmit={this.submitForm}>
                        <h1>{poll.title}</h1>

                        <List>
                            {poll.options.map((option, i) => {
                                return (
                                    <List.Item key={i}>
                                        <Radio
                                            label={option}
                                            checked={this.state.selectedOption === i}
                                            onClick={this.selectOption(i)}
                                        />
                                    </List.Item>
                                );
                            })}
                            <List.Item>
                                <Radio
                                    checked={this.state.selectedOption === 'newoption'}
                                    onClick={this.selectOption('newoption')}
                                />
                                {'\u00A0\u00A0'}<Input
                                    onClick={this.selectOption('newoption')}
                                    placeholder='New Option'
                                    value={this.state.newOption}
                                    onChange={this.changeNewOption} />
                            </List.Item>
                        </List>
                        {poll.userHasVoted && 'You have already voted in this Poll'}
                        <Form.Button
                            disabled={poll.userHasVoted}>Vote</Form.Button>
                        <Form.Button
                            onClick={() => {
                                browserHistory.push('/poll/' + poll.id + '/result');
                            }}
                            type="button">Results</Form.Button>
                    </Form>
                    <br />Share this poll by copying the URL in the address bar.
                </Container>
            </div >
        );
    }
}

// as={Link} to={'/poll/'+poll.id+'/result'}

export default connect(mapStateToProps, mapDispatchToProps)(Poll);
