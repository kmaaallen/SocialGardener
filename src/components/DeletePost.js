import React, { Component, Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import TooltipIconButton from '../util/TooltipIconButton';

//MUI stuff
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';

//Icons
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

//Redux stuff
import { connect } from 'react-redux';
import { deletePost } from '../redux/actions/dataActions';

const styles = {
    deleteButton: {
        paddingTop: 0,
        paddingRight: 0,
        float: "right"
    },
    red : {
        color: "#8b0000"
    }
}

class DeletePost extends Component {
    constructor() {
        super();
        this.state = {
            open: false
        }
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.deletePost = this.deletePost.bind(this);
    }

    handleOpen = () => {
        this.setState({
            open: true
        })
    }

    handleClose = () => {
        this.setState({
            open: false
        })
    }

    deletePost = () => {
        this.props.deletePost(this.props.postId);
        this.handleClose();
    }

    render() {
        const { classes } = this.props;
        return (
            <Fragment>
                <TooltipIconButton
                    tip="Delete post"
                    onclick={this.handleOpen}
                    btnClass={classes.deleteButton}>
                    <DeleteOutlineIcon className={classes.red}/>
                </TooltipIconButton>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
                <DialogTitle>Are you sure you want to delete this post?</DialogTitle>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">Cancel</Button>
                    <Button onClick={this.deletePost} className={classes.red}>Delete</Button>
                </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}

DeletePost.propTypes = {
    deletePost: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired
}

export default connect(null, { deletePost })(withStyles(styles)(DeletePost))
