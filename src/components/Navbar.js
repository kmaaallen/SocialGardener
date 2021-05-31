import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

//Material UI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

//Redux
import { connect } from 'react-redux';

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


export default connect(mapStateToProps)(NavBar);