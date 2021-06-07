import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
//Components
import EditDetails from './EditDetails';
import TooltipIconButton from '../../util/TooltipIconButton';
import ProfileSkeleton from '../../util/ProfileSkeleton';
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
import { uploadImage, logoutUser } from '../../redux/actions/userActions';

const styles = theme => ({
    editButton: {
        verticalAlign: 'super',
        padding: 0
    }
});

export class Profile extends Component {
    constructor(props) {
        super(props);
        this.handleEditImage = this.handleEditImage.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
    }

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
            <Paper className={classes.textAlignCenter}>
                <Grid container>
                    <Grid item xs={12}>
                        <img className={classes.profileImage} src={imageUrl} alt="User profile"></img>
                        <input type="file" id="imageUpload" hidden="hidden" onChange={this.handleImageChange} />
                        <TooltipIconButton
                            tip="Upload profile picture"
                            btnClass={classes.editButton}
                            onclick={this.handleEditImage}>
                            <AddAPhoto color="primary" />
                        </TooltipIconButton>
                    </Grid>
                    <Grid item xs={12} sm container className={classes.padding15}>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item>
                                <MuiLink component={Link} to={`/user/${userName}`}>{userName}</MuiLink>
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
                    <Grid item xs={12} className={classes.textAlignCenter}>
                        {bio && <Typography variant="body2" className={classes.padding15}>{bio}</Typography>}
                    </Grid>
                    <Grid item xs={12}>
                        <TooltipIconButton
                            tip="Logout"
                            btnClass={classes.floatLeft}
                            onclick={logoutUser}>
                            <ExitToAppIcon color="primary" />
                        </TooltipIconButton>
                        <EditDetails />
                    </Grid>
                </Grid>
            </Paper>
        ) : (
            <Paper className={classes.padding15}>
                <Typography variant="body2" align="center">No profile found. Please login or sign up.</Typography>
                <div className={classes.textAlignCenter}>
                    <Button className={classes.button} variant="contained" color="primary" component={Link} to="/login">Login</Button>
                    <Button className={classes.button} variant="contained" color="secondary" component={Link} to="/signup">Sign Up</Button>
                </div>
            </Paper>
        )) : (<ProfileSkeleton />);
        return profileMarkup;
    }
}

Profile.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object,
    uploadImage: PropTypes.func.isRequired,
    logoutUser: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({ user: state.user });

const mapActionsToProps = {
    uploadImage,
    logoutUser
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Profile));
