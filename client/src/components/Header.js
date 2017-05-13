import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';


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
                        <Nav className="ml-auto" navbar>
                            {!this.props.loggedIn &&
                                <NavItem>
                                    <NavLink tag={Link} to="/login">Login</NavLink>
                                </NavItem>
                            }
                            {!this.props.loggedIn &&
                                <NavItem>
                                    <NavLink tag={Link} to="/register">Register</NavLink>
                                </NavItem>
                            }
                            {this.props.loggedIn &&
                                <NavItem>
                                    <NavLink tag={Link} to="#" onClick={this.props.onClickLogout}>Logout</NavLink>
                                </NavItem>
                            }
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
