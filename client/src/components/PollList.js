import React from 'react';
import { Link } from 'react-router';
import { Segment, Container } from 'semantic-ui-react';

class PollList extends React.Component {

    render() {

        // console.log('polls', this.props.polls);
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
                            <button style={{ position: 'absolute', right: 0 }}>X</button>
                        </Segment>
                    );
                })}
            </Container>
        );
    }
}

export default PollList;
