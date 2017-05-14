import React from 'react';
import agent from '../agent';
import { connect } from 'react-redux';
import { Form } from 'semantic-ui-react';


import {
    GET_POLL
} from '../constants/actionTypes';

// const mapStateToProps = state => ({ ...state.forms.createPoll });
const mapStateToProps = state => ({
    poll: { ...state.currentPoll }
});

const mapDispatchToProps = dispatch => ({
    // onSubmit: (title, options) => {
    //     const payload = agent.Polls.create(title, options);
    //     //console.log(CREATE_POLL);
    //     dispatch({ type: CREATE_POLL, payload });
    // }
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
        //this.state selectedOption
    }

    // id from router???

    // on component will mount
    // test currentPoll.id === router.id
    // else fetch poll for router.id

    componentWillMount() {
        // console.log('will mount', this.props.params.id);
        // console.log('will mount', this.props.poll.id);

        if(this.props.params.id != this.props.poll.id){
            this.props.getPoll(this.props.params.id);
        }

    }

    render() {

        // console.log('poll',this.props.poll);
        if (!this.props.poll.title) {
            return <div>Loading.....</div>;
        }
        return (
            <div>
                Poll single
                {/*{this.props.poll}*/}
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Poll);
