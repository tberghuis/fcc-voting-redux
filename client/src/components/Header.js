import React from 'react';
import { Link } from 'react-router';


class Header extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-light">
                <div className="container">
                    FCC Voting Redux
                    {/*<Link to="/" className="navbar-brand">
                        {this.props.appName.toLowerCase()}
                    </Link>*/}

                    <ul className="nav navbar-nav pull-xs-right">

                        <li className="nav-item">
                            <Link to="login" className="nav-link">
                                Sign in
                            </Link>
                        </li>

                    </ul>
                </div>
            </nav>
        );
    }
}

export default Header;
