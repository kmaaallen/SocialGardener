import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
//Components
import TooltipIconButton from '../../util/TooltipIconButton';
import CreatePost from '../Post/CreatePost';
import Notifications from './Notifications';
//Material UI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
//Icons
import HomeIcon from '@material-ui/icons/Home';
//Redux
import { connect } from 'react-redux';

const styles = {
    header: {
        flexGrow: 1,
        float: 'left',
    }
}

export class NavBar extends Component {
    render() {
        const { authenticated, classes } = this.props;
        let links = !authenticated ? ((
            <AppBar position="fixed">
                <Toolbar className="toolbar">
                    <Typography variant="h6" className={classes.header}>The Social Gardener</Typography>
                    <Fragment>
                        <Button color="inherit" component={Link} to="/">Home</Button>
                        <Button color="inherit" component={Link} to="/login">Login</Button>
                        <Button color="inherit" component={Link} to="/signup">Signup</Button>
                    </Fragment>
                </Toolbar>
            </AppBar>
        )) : (
            <AppBar position="fixed">
                <Toolbar className="toolbar">
                    <Typography variant="h6" className={classes.header}>The Social Gardener</Typography>
                    <Fragment>
                        <CreatePost />
                        <Notifications />
                        <Link to="/">
                            <TooltipIconButton tip="Home">
                                <HomeIcon />
                            </TooltipIconButton>
                        </Link>
                    </Fragment>
                </Toolbar>
            </AppBar>
        );
        return links;
    }
}

NavBar.propTypes = {
    user: PropTypes.object,
    classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({ authenticated: state.user.authenticated });

export default connect(mapStateToProps)(withStyles(styles)(NavBar));