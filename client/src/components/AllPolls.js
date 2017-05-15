import React from 'react';
import agent from '../agent';
import { connect } from 'react-redux';
// import { Table } from 'semantic-ui-react';
// import Measure from 'react-measure';

import {
    GET_POLL_ALL
} from '../constants/actionTypes';

const mapStateToProps = state => ({
    // poll: { ...state.currentPoll }
});

const mapDispatchToProps = dispatch => ({
    // getPoll: (id) => {
    //     //use promise middleware
    //     const payload = agent.Polls.get(id);
    //     dispatch({ type: GET_POLL, payload });
    // }
    getAllPolls: () => {
        //use promise middleware
        const payload = agent.Polls.all();
        dispatch({ type: GET_POLL_ALL, payload });
    }
});
//
class AllPolls extends React.Component {

    componentWillMount() {
        this.props.getAllPolls();
    }

    render() {


        return (
            <div>
                All Polls
            </div >
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllPolls);
