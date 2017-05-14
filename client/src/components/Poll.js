import React from 'react';
import agent from '../agent';
import { connect } from 'react-redux';
import { Form } from 'semantic-ui-react';


import {
//    CREATE_POLL
} from '../constants/actionTypes';

// const mapStateToProps = state => ({ ...state.forms.createPoll });
const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    // onSubmit: (title, options) => {
    //     const payload = agent.Polls.create(title, options);
    //     //console.log(CREATE_POLL);
    //     dispatch({ type: CREATE_POLL, payload });
    // }
});
//
class Poll extends React.Component {
    constructor() {
        super();

    }

    // id from router???

    // on component will mount
    // test currentPoll.id === router.id
    // else fetch poll for router.id


    render() {

        return (
            <div>
                Poll single
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Poll);
