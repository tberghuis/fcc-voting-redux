import React from 'react';
import agent from '../agent';
import { connect } from 'react-redux';
// import { Table } from 'semantic-ui-react';

import PollList from './PollList';

import {
    GET_POLL_MY
} from '../constants/actionTypes';

const mapStateToProps = state => ({
    polls: state.myPolls
});

const mapDispatchToProps = dispatch => ({
    getMyPolls: () => {
        const payload = agent.Polls.my();
        dispatch({ type: GET_POLL_MY, payload });
    }
});

class MyPolls extends React.Component {

    componentWillMount() {
        this.props.getMyPolls();
    }

    render() {
        //console.log('polls', this.props.polls);
        return (
            <div>
                My Polls
                <PollList polls={this.props.polls} delete />
            </div >
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyPolls);
