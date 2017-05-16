import React from 'react';
import { Link } from 'react-router';
import { Segment, Container } from 'semantic-ui-react';
import { connect } from 'react-redux';
import agent from '../agent';

import {
    POLL_DELETE
} from '../constants/actionTypes';

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
    deletePoll: (id) => {
        const payload = agent.Polls.delete(id); 
        // a promise will just kick off straight away
        // no need to pass payload promise to redux
        // unless i was dealing with returned error from server in reducer
        dispatch({ type: POLL_DELETE, payload, id });
    }
});

class PollList extends React.Component {

    // this probably should have been passed down as a prop
    handleDelete = (pollId) => () => {
        this.props.deletePoll(pollId);
    }

    render() {
        return (
            <Container text>
                {this.props.polls.map((poll, i) => {
                    return (
                        <Segment vertical key={i} style={{ position: 'relative' }}>
                            <h3 style={{ display: 'inline' }}>
                                <Link to={"/poll/" + poll._id}>
                                    {poll.title}
                                </Link>
                            </h3>
                            {this.props.delete && <button style={{ position: 'absolute', right: 0 }}
                                onClick={this.handleDelete(poll._id)}>X</button>}
                        </Segment>

                    );
                })}
            </Container>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PollList);
