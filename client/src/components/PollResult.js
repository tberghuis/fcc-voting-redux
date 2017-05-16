import React from 'react';
import agent from '../agent';
import { connect } from 'react-redux';
import { Table } from 'semantic-ui-react';

import {
    GET_POLL
} from '../constants/actionTypes';

const mapStateToProps = state => ({
    poll: { ...state.currentPoll }
});

const mapDispatchToProps = dispatch => ({
    getPoll: (id) => {
        const payload = agent.Polls.get(id);
        dispatch({ type: GET_POLL, payload });
    }
});

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

        const getVotesIndex = () => {
            return poll.votes.map((numVotes, index) => {
                return { numVotes, index };
            });
        };

        const totalVotes = poll.votes.reduce(function (a, b) { return a + b; }, 0);

        const getTableRows = () => {
            let sortedVotesIndex = getVotesIndex()
                .sort((a, b) => b.numVotes - a.numVotes);

            const maxVotes = sortedVotesIndex[0].numVotes;

            return sortedVotesIndex
                .map(voteIndex => {
                    return (
                        <Table.Row key={voteIndex.index}>
                            <Table.Cell>{poll.options[voteIndex.index]}</Table.Cell>
                            <Table.Cell>
                                {(() => {
                                    if (maxVotes === 0) {
                                        return <div></div>;
                                    }
                                    let w = 100 / maxVotes * voteIndex.numVotes;
                                    return <div style={{
                                        backgroundColor: "blue",
                                        width: w + '%',
                                        height: '20px'
                                    }} ></div>;
                                })()}
                            </Table.Cell>
                            <Table.Cell>{voteIndex.numVotes}</Table.Cell>
                            <Table.Cell>{Math.round(100 * voteIndex.numVotes / totalVotes)} %</Table.Cell>
                        </Table.Row>
                    );
                });
        };

        return (
            <div>
                Poll Result
                <h1 style={{
                    textAlign: "center"
                }}>{poll.title}</h1>
                <Table striped>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Option</Table.HeaderCell>
                            <Table.HeaderCell>Bar Chart</Table.HeaderCell>
                            <Table.HeaderCell>Votes</Table.HeaderCell>
                            <Table.HeaderCell>%</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {getTableRows()}
                    </Table.Body>
                </Table>
            </div >
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PollResult);
