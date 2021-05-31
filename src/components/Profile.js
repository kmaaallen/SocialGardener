import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import EditDetails from './EditDetails';
import TooltipIconButton from '../util/TooltipIconButton';

//MUI stuff
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import MuiLink from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';

//Icons
import LocationOn from '@material-ui/icons/LocationOn';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import AddAPhoto from '@material-ui/icons/AddAPhoto';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

//Redux
import { connect } from 'react-redux';
import { uploadImage, logoutUser } from '../redux/actions/userActions';

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

    button: {
        margin: '15px'
    },

    editButton: {
        verticalAlign: 'super',
        padding: 0
    },

    body2: {
        fontSize: '0.875rem',
        verticalAlign: 'super',
        paddingLeft: '10px'
    },

    left: {
        float: 'left'
    }

    //TODO
    //TODO - USER LINK
};

export class Profile extends Component {

    handleEditImage = () => {
        const fileInput = document.getElementById('imageUpload');
        fileInput.click();
    }

    handleImageChange = (event) => {
        const image = event.target.files[0];
        const formData = new FormData();
        formData.append('image', image, image.name);
        this.props.uploadImage(formData);


    }

    render() {
        const { logoutUser, classes, user: { credentials: { userName, created, imageUrl, bio, location },
            loading, authenticated } } = this.props;

        let profileMarkup = !loading ? (authenticated ? (
            <Paper className={classes.bio}>
                <Grid container>
                    <Grid item xs={12}>
                        <img className={classes.image} src={imageUrl} alt="user profile image"></img>
                        <input type="file" id="imageUpload" hidden="hidden" onChange={this.handleImageChange} />
                        <TooltipIconButton
                            tip="Upload profile picture"
                            btnClass={classes.editButton}
                            onclick={this.handleEditImage}>
                            <AddAPhoto color="primary" />
                        </TooltipIconButton>
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
                    <Grid item xs={12}>
                        <TooltipIconButton
                            tip="Logout"
                            btnClass={classes.left}
                            onclick={logoutUser}>
                            <ExitToAppIcon color="primary" />
                        </TooltipIconButton>
                        <EditDetails />
                    </Grid>
                </Grid>
            </Paper>
        ) : (
            <Paper className={classes.padding}>
                <Typography variant="body2" align="center">No profile found. Please login or sign up.</Typography>
                <div className={classes.bio}>
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
    user: PropTypes.object,
    uploadImage: PropTypes.func.isRequired,
    logoutUser: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user
});

const mapActionsToProps = {
    uploadImage,
    logoutUser
}


export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Profile));
