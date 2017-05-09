import React from 'react';
import { Link } from 'react-router';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import FlatButton from 'material-ui/FlatButton';


class Header extends React.Component {
    render() {
        return (
            <Toolbar>
                <ToolbarGroup firstChild={true}>
                    <FlatButton label="All Polls" />
                    <FlatButton label="My Polls" />
                </ToolbarGroup>
                <ToolbarGroup>
                    <FlatButton label="Login" containerElement={<Link to="/login"/>} />
                    <FlatButton label="Register" containerElement={<Link to="/register"/>} />
                </ToolbarGroup>
            </Toolbar>
        );
    }
}

export default Header;


