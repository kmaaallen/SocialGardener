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
import Grid from '@material-ui/core/Grid';

//Icons
import LocationOn from '@material-ui/icons/LocationOn';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';

//Redux
import { connect } from 'react-redux';

const styles = {
    image: {
        height: '100px',
        width: '100px'
    },

    profile: {
        textAlign: 'center',
    },

    padding: {
        padding: '15px'
    },
    //TODO
    //TODO - USER LINK
};

export class Profile extends Component {
    render() {
        const { classes, user: { credentials: { userName, created, imageUrl, bio, location },
            loading, authenticated } } = this.props;

        let profileMarkup = !loading ? (authenticated ? (
            <Paper>
                <div className={classes.profile}>
                    <div className={classes.padding}>
                        <img className={classes.image} src={imageUrl} alt="user profile image"></img>
                    </div>
                    <MuiLink component={Link} to='#'>{userName}</MuiLink>
                    {bio && <Typography variant="body2" className={classes.padding}>{bio}</Typography>}
                    {location && (
                        <Grid container>
                            <Grid item xs={4}>
                                <LocationOn color="primary" />
                            </Grid>
                            <Grid item xs={8}>
                                <Typography variant="body2" align="left">{location}</Typography>
                            </Grid>
                        </Grid>

                    )}
                    <Grid container>
                        <Grid item xs={4}>
                            <CalendarTodayIcon color="primary" />
                        </Grid>
                        <Grid item xs={8}>
                            <Typography variant="body2" align="left">Joined: {dayjs(created).format('MMM YYYY')}</Typography>
                        </Grid>
                    </Grid>

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
