import React from 'react';
import { Link } from 'react-router';
import { Segment } from 'semantic-ui-react';

class PollList extends React.Component {

    render() {

        // console.log('polls', this.props.polls);
        return (
            <div style={{ textAlign: 'center' }}>
                {this.props.polls.map((poll, i) => {
                    return (
                        <Segment vertical key={i}>
                            <Link to={"/poll/" + poll._id}>
                                <h3>{poll.title}</h3>
                            </Link>
                        </Segment>
                    );
                })}
            </div>
        );
    }
}

export default PollList;
