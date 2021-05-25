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
        width: '100px',
        marginTop: '20%'
    },

    bio: {
        textAlign: 'center',
    },

    padding: {
        padding: '15px'
    },

    button: {
        margin: '15px'
    },

    body2: {
        fontSize: '0.875rem',
        verticalAlign: 'super',
        paddingLeft: '10px'
    }

    //TODO
    //TODO - USER LINK
};

export class Profile extends Component {
    render() {
        const { classes, user: { credentials: { userName, created, imageUrl, bio, location },
            loading, authenticated } } = this.props;

        let profileMarkup = !loading ? (authenticated ? (
            <Paper>
                <Grid container>
                    <Grid item>
                        <img className={classes.image} src={imageUrl} alt="user profile image"></img>
                    </Grid>
                    <Grid item xs={12} sm container className={classes.padding}>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item>
                                <MuiLink component={Link} to='#'>{userName}</MuiLink>
                            </Grid>
                            {location && (
                                <Grid item>
                                    <LocationOn color="primary" />
                                    <span className={classes.body2}>{location}</span>
                                    <br />
                                </Grid>
                            )}

                            <Grid item>
                                <CalendarTodayIcon color="primary" />
                                <span className={classes.body2}>Joined: {dayjs(created).format('MMM YYYY')}</span>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} className={classes.bio}>
                    {bio && <Typography variant="body2" className={classes.padding}>{bio}</Typography>}

                </Grid>
                </Grid>
                

            </Paper>
        ) : (
            <Paper className={classes.padding}>
                <Typography variant="body2" align="center">No profile found. Please login or sign up.</Typography>
                <div className={classes.profile}>
                    <Button className={classes.button} variant="contained" color="primary" component={Link} to="/login">Login</Button>
                    <Button className={classes.button} variant="contained" color="secondary" component={Link} to="/signup">Sign Up</Button>
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
