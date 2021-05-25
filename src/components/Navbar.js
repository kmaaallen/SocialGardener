import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

//Material UI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

//Redux
import { connect } from 'react-redux';
import { logoutUser } from '../redux/actions/userActions';

export class NavBar extends Component {
    render() {
        const {authenticated} = this.props;
        let links = !authenticated ? ((
            <AppBar position="fixed">
                <Toolbar className="toolbar">
                    <Button color="inherit" component={Link} to="/">Home</Button>
                    <Button color="inherit" component={Link} to="/login">Login</Button>
                    <Button color="inherit" component={Link} to="/signup">Signup</Button>
                </Toolbar>
            </AppBar>
        )) : (
            <AppBar position="fixed">
                <Toolbar className="toolbar">
                    <Button color="inherit" component={Link} to="/">Home</Button>
                    <Button color="inherit" onClick={this.props.logoutUser}>Logout</Button>
                </Toolbar>
            </AppBar>
        ) ;

        return links;
    }
}

NavBar.propTypes = {
    user: PropTypes.object
}

const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated
})

const mapActionsToProps = {
    logoutUser
}

export default connect(mapStateToProps, mapActionsToProps)(NavBar);