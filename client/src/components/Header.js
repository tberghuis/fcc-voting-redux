import React from 'react';
import { Link, IndexLink } from 'react-router';
import { connect } from 'react-redux';
import { Menu } from 'semantic-ui-react';

import {
    LOGOUT
} from '../constants/actionTypes';

const mapStateToProps = state => ({
    loggedIn: state.common.loggedIn
});

const mapDispatchToProps = dispatch => ({
    onClickLogout: () => dispatch({ type: LOGOUT })
});

class Header extends React.Component {
    render() {
        // TODO migrate to react router 4 and use active class or something
        let activeStyle = { backgroundColor: 'rgba(0, 0, 0, 0.05)' }
        return (
            <Menu>
                <Menu.Item as={IndexLink} to="/" activeStyle={activeStyle} >
                    All Polls
                </Menu.Item>
                {this.props.loggedIn &&
                    <Menu.Item as={Link} to="/mypolls" activeStyle={activeStyle}>
                        My Polls
                    </Menu.Item>
                }
                {this.props.loggedIn &&
                    <Menu.Item as={Link} to="/createpoll" activeStyle={activeStyle}>
                        Create Poll
                    </Menu.Item>
                }
                <Menu.Menu position='right'>
                    {!this.props.loggedIn &&
                        <Menu.Item as={Link} to="/login" activeStyle={activeStyle}>
                            Login
                        </Menu.Item>
                    }
                    {!this.props.loggedIn &&
                        <Menu.Item as={Link} to="/register" activeStyle={activeStyle}>
                            Register
                        </Menu.Item>
                    }
                    {this.props.loggedIn &&
                        <Menu.Item onClick={this.props.onClickLogout}>
                            Logout
                        </Menu.Item>
                    }
                </Menu.Menu>
            </Menu>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
