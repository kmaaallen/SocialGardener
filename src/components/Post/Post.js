import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
//Components
import TooltipIconButton from '../../util/TooltipIconButton';
import DeletePost from './DeletePost';
import PostDialog from './PostDialog';
import LikeButton from './LikeButton';
//MUI stuff
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
//Icons
import ChatIcon from '@material-ui/icons/Chat';
//Redux stuff
import { connect } from 'react-redux';

const styles = {
    card: {
        display: 'flex',
        marginBottom: '20px',
    },
    image: {
        width: '150px',
        height: '150px',
        borderRadius: '50%',
        objectFit: 'cover',
        marginTop: '15px',
        marginLeft: '15px'
    },
    content: {
        padding: 25,
        objectFit: 'cover',
        width: 'fill-available'
    }
}

class Post extends Component {
    render() {
        dayjs.extend(relativeTime);
        const {
            openDialog,
            classes,
            post: { content, created, userImage, userName, postId, likeCount, commentCount },
            user: { authenticated } } = this.props;

        const deleteButton = authenticated && userName === this.props.user.credentials.userName ? (
            <DeletePost postId={postId} />
        ) : null;
        return (
            <Card className={classes.card}>
                <CardMedia
                    image={userImage}
                    title='Profile Image'
                    className={classes.image}
                    component="img" />
                <CardContent className={classes.content}>
                    <Typography variant="h5" component={Link} to={`/user/${userName}`} color="primary">{userName}</Typography>
                    {deleteButton}
                    <Typography variant="body2" color="textSecondary">{dayjs(created).fromNow()}</Typography>
                    <Typography variant="body1">{content}</Typography>
                    <LikeButton postId={postId} />
                    <span>{likeCount} likes</span>
                    <TooltipIconButton tip="Comments">
                        <ChatIcon color="primary" />
                    </TooltipIconButton>
                    <span>{commentCount} comments</span>
                    <PostDialog postId={postId} userName={userName} openDialog={openDialog} />
                </CardContent>
            </Card>
        )
    }
}

Post.propTypes = {
    user: PropTypes.object,
    post: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    openDialog: PropTypes.bool
}

const mapStateToProps = (state) => ({
    user: state.user
})



export default connect(mapStateToProps)(withStyles(styles)(Post));
