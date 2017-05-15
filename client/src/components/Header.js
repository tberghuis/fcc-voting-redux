import React from 'react';
import { Link } from 'react-router';
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

        return (
            <Menu>
                <Menu.Item as={Link} to="/">
                    All Polls
                </Menu.Item>

                <Menu.Item>
                    My Polls
                </Menu.Item>
                {this.props.loggedIn &&
                    <Menu.Item as={Link} to="/createpoll">
                        Create Poll
                    </Menu.Item>
                }

                <Menu.Menu position='right'>

                    {!this.props.loggedIn &&
                        <Menu.Item as={Link} to="/login">
                            Login
                        </Menu.Item>
                    }
                    {!this.props.loggedIn &&
                        <Menu.Item as={Link} to="/register">
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

        /*return (
            <Navbar toggleable>
                <Container>
                    <NavbarBrand tag={Link} to="/">FCC Voting App</NavbarBrand>
                    <Collapse isOpen={true} navbar>
                        <Nav className="mr-auto" navbar>
                            <NavItem>
                                <NavLink href="#">All Polls</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="#">My Polls</NavLink>
                            </NavItem>
                            {this.props.loggedIn &&
                                <NavItem>
                                    <NavLink tag={Link} to="/createpoll">Create Poll</NavLink>
                                </NavItem>
                            }
                        </Nav>

                    </Collapse>
                </Container>
            </Navbar>
        );*/
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
