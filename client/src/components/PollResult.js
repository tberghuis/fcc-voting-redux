import React from 'react';
import agent from '../agent';
import { connect } from 'react-redux';
// import { Form, List, Radio, Input } from 'semantic-ui-react';

import {
    GET_POLL
    // POLL_VOTE
} from '../constants/actionTypes';

const mapStateToProps = state => ({
    poll: { ...state.currentPoll }
});

const mapDispatchToProps = dispatch => ({
    // vote: (id, optionIndex, newOption) => {
    //     const payload = agent.Polls.vote(id, optionIndex, newOption);
    //     dispatch({ type: POLL_VOTE, payload });
    // },
    getPoll: (id) => {
        //use promise middleware
        const payload = agent.Polls.get(id);
        dispatch({ type: GET_POLL, payload });
    }
});
//
class PollResult extends React.Component {


    componentWillMount() {
        if (this.props.params.id !== this.props.poll.id) {
            this.props.getPoll(this.props.params.id);
        }
    }



    render() {
        if (!this.props.poll.title) {
            return <div>Loading.....</div>;
        }
        let poll = this.props.poll;
        return (
            <div>
                poll result
            </div >
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PollResult);
