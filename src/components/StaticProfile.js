import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

//MUI stuff
import MuiLink from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

//Icons
import LocationOn from '@material-ui/icons/LocationOn';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';

const styles = {
    image: {
        width: '180px',
        height: '180px',
        borderRadius: '50%',
        objectFit: 'cover',
        marginTop: '15px'
    },
    bio: {
        textAlign: 'center',
    },
    padding: {
        padding: '15px'
    },
    body2: {
        fontSize: '0.875rem',
        verticalAlign: 'super',
        paddingLeft: '10px'
    },
    left: {
        float: 'left'
    }
};

const StaticProfile = (props) => {
    const { classes, profile: { userName, created, imageUrl, bio, location } } = props;
    return (
        <Paper className={classes.bio}>
            <Grid container>
                <Grid item xs={12}>
                    <img className={classes.image} src={imageUrl} alt="User profile"></img>
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
    )
}

StaticProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(StaticProfile);
