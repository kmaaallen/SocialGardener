import React, { Component, Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import TooltipIconButton from '../util/TooltipIconButton';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import LikeButton from './LikeButton';
import Comments from './Comments';
import CreateComment from './CreateComment';

//MUI stuff
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

//Icons
import CloseIcon from '@material-ui/icons/Close';
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';
import ChatIcon from '@material-ui/icons/Chat';

//Redux stuff
import { connect } from 'react-redux';
import { getPost, clearErrors } from '../redux/actions/dataActions';

const styles =  theme => ({
    ...theme.classes,
    image: {
        width: '180px',
        height: '180px',
        borderRadius: '50%',
        objectFit: 'cover'
    },
    closeButton: {
        position: 'absolute',
        left: '90%',
        top: '5%'
    },
    dialogContent: {
        padding: 20
    },
    spinnerDiv: {
        textAlign: 'center',
        marginTop: 50,
        marginBottom: 50
    }
})

class PostDialog extends Component {
    constructor() {
        super();
        this.state = {
            open: false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleOpen = () => {
        this.setState({ open: true });
        this.props.getPost(this.props.postId);
    }

    handleClose = () => {
        this.setState({ open: false });
        this.props.clearErrors();

    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }


    render() {
        const { classes,
            post: { created, likeCount, commentCount, userName, userImage, content, postId, comments },
            UI: { loading } } = this.props;
        const dialogMarkup = loading ? (
            <div className={classes.spinnerDiv}>
                <CircularProgress size={200} thickness={2}/>
            </div>
        ) : (
            <Grid container>
                <Grid item sm={5}>
                    <img src={userImage} alt="Profile" className={classes.image} />
                </Grid>
                <Grid item sm={7}>
                    <Typography component={Link} color="primary" variant="h5" to={`/users/${userName}`}>
                        @{userName}
                    </Typography>
                    <hr className={classes.invisibleSeparator}/>
                    <Typography variant="body2" color="textSecondary">
                        Created: {dayjs(created).format('h:mm a, MMMM DD YYYY')}
                    </Typography>
                    <hr className={classes.invisibleSeparator}/>
                    <Typography variant="body1">
                        {content}
                    </Typography>
                    <LikeButton postId={postId}/>
                    <span>{likeCount} likes</span>
                    <TooltipIconButton tip="Comments">
                        <ChatIcon color="primary" />
                    </TooltipIconButton>
                    <span>{commentCount} comments</span>
                </Grid>
                <hr className={classes.visibleSeparator} />
                <CreateComment postId={postId} />
                <Comments comments={comments} />
            </Grid>
        )
        return (
            <Fragment>
                <TooltipIconButton onclick={this.handleOpen} tip="Expand post" tipClass={classes.expandButton}>
                    <UnfoldMoreIcon color="primary"/>
                </TooltipIconButton>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
                    <TooltipIconButton tip="Close" btnClass={classes.closeButton} onclick={this.handleClose}>
                        <CloseIcon color="primary" />
                    </TooltipIconButton>
                    <DialogContent className={classes.dialogContent}>
                        {dialogMarkup}
                    </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
}

PostDialog.propTypes = {
    getPost: PropTypes.func.isRequired,
    postId: PropTypes.string.isRequired,
    clearErrors: PropTypes.func.isRequired,
    userName: PropTypes.string.isRequired,
    post: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    UI: state.UI,
    post: state.data.post
})

const mapActionsToProps = {
    getPost,
    clearErrors
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(PostDialog));
