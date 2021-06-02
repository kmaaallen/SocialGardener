import React, { Component, Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import TooltipIconButton from '../util/TooltipIconButton';

//MUI stuff
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';

//Icons
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';

//Redux stuff
import { connect } from 'react-redux';
import { createPost, clearErrors } from '../redux/actions/dataActions';

const styles = theme => ({
    ...theme.classes,
    submitButton: {
        position: 'relative',
        marginTop: '15px',
        float: 'right'
    },
    progressSpinner: {
        position: 'absolute'
    },
    closeButton: {
        position: 'absolute',
        left: '90%',
    }
});

class CreatePost extends Component {
    constructor() {
        super();
        this.state = {
            open: false,
            content: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }


    componentDidUpdate(prevProps) {
        if (prevProps.data.posts !== this.props.data.posts && this.state.open) {
            this.handleClose();
        }
    }


    handleOpen = () => {
        this.setState({
            open: true
        })
    }

    handleClose = () => {
        this.props.clearErrors();
        this.setState({
            open: false,
            content: ''
        })
    }


    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.createPost({ content: this.state.content });

    }



    render() {
        //const { errors } = this.state;
        const { classes, UI: { loading, errors } } = this.props;
        return (
            <Fragment>
                <TooltipIconButton tip="Create a Post" onclick={this.handleOpen}>
                    <AddIcon />
                </TooltipIconButton>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
                    <TooltipIconButton tip="Close" btnClass={classes.closeButton} onclick={this.handleClose}>
                        <CloseIcon color="primary" />
                    </TooltipIconButton>
                    <DialogTitle>Create a new post</DialogTitle>
                    <DialogContent>
                        <form onSubmit={this.handleSubmit}>
                            <TextField
                                name="content"
                                type="text"
                                label="Post"
                                multiline
                                fullWidth
                                rows="3"
                                placeholder="Type your post here"
                                error={errors ? true : false}
                                helperText={errors ? errors.content : ''}
                                className={classes.TextField}
                                onChange={this.handleChange} />
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                className={classes.submitButton}
                                disabled={loading}>
                                {loading && (<CircularProgress
                                    size={30}
                                    className={classes.progressSpinner} />)}
                                    Submit
                                </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
}

CreatePost.propTypes = {
    createPost: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    UI: state.UI,
    data: state.data
})

const mapActionsToProps = {
    createPost,
    clearErrors
}


export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(CreatePost));
