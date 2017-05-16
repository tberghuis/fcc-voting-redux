import React from 'react';
import agent from '../agent';
import { connect } from 'react-redux';

import PollList from './PollList';

import {
    GET_POLL_ALL
} from '../constants/actionTypes';

const mapStateToProps = state => ({
    polls: state.allPolls,
    loggedIn: state.common.loggedIn
});

const mapDispatchToProps = dispatch => ({
    getAllPolls: () => {
        const payload = agent.Polls.all();
        dispatch({ type: GET_POLL_ALL, payload });
    }
});

class AllPolls extends React.Component {

    componentWillMount() {
        this.props.getAllPolls();
    }

    render() {
        return (
            <div>
                All Polls<br />
                {!this.props.loggedIn &&
                    'Please register or login if you would like to create a new poll.'
                }

                <PollList polls={this.props.polls} />
            </div >
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllPolls);
