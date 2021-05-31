import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

//MUI stuff
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

//Icons
import Edit from '@material-ui/icons/Edit';

//Redux Stuff
import { connect } from 'react-redux';
import { editUserDetails } from '../redux/actions/userActions';

const styles = {
    right: {
        float: 'right'
    }
};

class EditDetails extends Component {
    state = {
        bio: '',
        location: '',
        open: false
    }
    //TODO: WHY TWO CREDENTIALS IN USER
    
    mapUserDetailsToState = (details) => {
        this.setState({
            bio: details.bio ? details.bio : '',
            location: details.location ? details.location : ''
        })
    }

    componentDidMount() {
        this.mapUserDetailsToState(this.props.details);
    }

    handleOpen = () => {
        this.mapUserDetailsToState(this.props.details);
        this.setState({
            open: true
        })
    }

    handleClose = () => {
        this.setState({
            open: false
        })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSave = () => {
        const userDetails = {
            bio: this.state.bio,
            location: this.state.location
        }
        this.props.editUserDetails(userDetails);
        this.handleClose();
    }

    render() {
        const { classes } = this.props;
        return (
            <Fragment>
                <Tooltip title="Edit Details" placement="top">
                    <IconButton onClick={this.handleOpen} className={classes.right}>
                        <Edit color="primary" />
                    </IconButton>
                </Tooltip>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
                <DialogTitle>Edit your details</DialogTitle>
                <DialogContent>
                    <form>
                        <TextField 
                        name="bio" 
                        type="text" 
                        label="Bio" 
                        multiline 
                        fullWidth
                        placeholder="A short bio about yourself" 
                        className={classes.textField}
                        value={this.state.bio}
                        onChange={this.handleChange}/>
                         <TextField 
                        name="location" 
                        type="text" 
                        label="Location" 
                        fullWidth
                        placeholder="Location" 
                        className={classes.textField}
                        value={this.state.location}
                        onChange={this.handleChange}/>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">Cancel</Button>
                    <Button onClick={this.handleSave} color="primary">Save</Button>
                </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}

EditDetails.propTypes = {
    editUserDetails: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    details: state.user.credentials
});

const mapActionsToProps = {
    editUserDetails
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(EditDetails))
