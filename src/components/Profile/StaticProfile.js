import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import dayjs from 'dayjs';
//MUI stuff
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
//Icons
import LocationOn from '@material-ui/icons/LocationOn';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';

const styles = theme => ({ ...theme.classes });

const StaticProfile = (props) => {
    const { classes, profile: { userName, created, imageUrl, bio, location } } = props;
    return (
        <Paper className={classes.textAlignCenter}>
            <Grid container>
                <Grid item xs={12}>
                    <img className={classes.profileImage} src={imageUrl} alt="User profile"></img>
                </Grid>
                <Grid item xs={12} sm container className={classes.padding15}>
                    <Grid item xs container direction="column" spacing={2}>
                        <Grid item>{userName}</Grid>
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
                <Grid item xs={12} className={classes.textAlignCenter}>
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
