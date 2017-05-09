import React from 'react';
import { Link } from 'react-router';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import FlatButton from 'material-ui/FlatButton';
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
        //console.log(this.props.loggedIn);
        
        return (
            <Toolbar>
                <ToolbarGroup firstChild={true}>
                    <FlatButton label="All Polls" />
                    <FlatButton label="My Polls" />
                </ToolbarGroup>
                <ToolbarGroup>
                    {!this.props.loggedIn &&
                        <FlatButton label="Login" containerElement={<Link to="/login" />} />
                    }
                    {!this.props.loggedIn &&
                        <FlatButton label="Register" containerElement={<Link to="/register" />} />
                    }
                    {this.props.loggedIn &&
                        <FlatButton label="Logout"
                            onClick={this.props.onClickLogout}
                        />
                    }

                </ToolbarGroup>
            </Toolbar>
        );
    }
}

//export default Header;


export default connect(mapStateToProps, mapDispatchToProps)(Header);
