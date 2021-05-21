import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

//MUI stuff
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import MuiLink from '@material-ui/core/Link';

//Icons
import LocationOn from '@material-ui/icons/LocationOn';

//Redux
import { connect } from 'react-redux';

const styles = {
    image: {
        height: '200px',
        width: '200px'
    }
    //TODO
    //TODO - USER LINK
};

export class Profile extends Component {
    render() {
        const { classes, user: { credentials: { userName, created, imageUrl,  bio, location },
            loading, authenticated } } = this.props;

        let profileMarkup = !loading ? (authenticated ? (
            <Paper>
                <div>
                    <div>
                        <img className={classes.image} src={imageUrl} alt="user profile image"></img>
                    </div>
                    <MuiLink component={Link} href='#'>{userName}</MuiLink>
                    <hr />
                    {bio && <Typography variant="body2">{bio}</Typography>}
                    <hr />
                    {location && (
                        <Fragment>
                            <LocationOn color="primary" /> <span>{location}</span>
                            <hr />
                        </Fragment>
                    )}
                    <div>Joined: {dayjs(created).format('MMM YYYY')}</div>
                </div>

            </Paper>
        ) : (
            <Paper>
                <Typography variant="body2" align="center">No profile found. Please login again.</Typography>
                <div>
                    <Button variant="contained" color="primary" component={Link} to="/login">Login</Button>
                    <Button variant="contained" color="secondary" component={Link} to="/signup">Sign Up</Button>
                </div>
            </Paper>
        )) : (<p>Loading...</p>);

        return profileMarkup;
    }
}

Profile.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object
}

const mapStateToProps = (state) => ({
    user: state.user
});


export default connect(mapStateToProps)(withStyles(styles)(Profile));
