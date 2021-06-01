import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
import TooltipIconButton from '../util/TooltipIconButton';
import { Link } from 'react-router-dom';

//MUI stuff
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

//Icons
import ChatIcon from '@material-ui/icons/Chat';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

//Redux stuff
import { connect } from 'react-redux';
import { likePost, unlikePost } from '../redux/actions/dataActions';

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
        marginTop: '15px'
    },
    content: {
        padding: 25,
        objectFit: 'cover'
    }
}

class Post extends Component {

    likedPost = () => {
        if (this.props.user.likes && this.props.user.likes.find(like => like.postId === this.props.post.postId)) {
            return true;
        } else {
            return false;
        }
    }

    likePost = () => {
        this.props.likePost(this.props.post.postId);
    }

    unlikePost = () => {
        this.props.unlikePost(this.props.post.postId);
    }

    render() {
        dayjs.extend(relativeTime);
        const {
            classes,
            post: { content, created, userImage, userName, postId, likeCount, commentCount },
            user: { authenticated } } = this.props;
        const likeButton = !authenticated ? (
            <TooltipIconButton tip="Like">
                <Link to="/login">
                    <FavoriteBorderIcon color="primary" />
                </Link>
            </TooltipIconButton>
        ) : (this.likedPost() ? (
            <TooltipIconButton tip="Unlike" onclick={this.unlikePost}>
                <FavoriteIcon color="primary" />
            </TooltipIconButton>
        ) : (
            <TooltipIconButton tip="Like" onclick={this.likePost}>
                <FavoriteBorderIcon color="primary" />
            </TooltipIconButton>
        )
            
        )
        return (
            <Card className={classes.card}>
                <CardMedia
                    image={userImage}
                    title='Profile Image'
                    className={classes.image} 
                    component="img"/>
                <CardContent className={classes.content}>
                    <Typography variant="h5" component={Link} to={`/users/${userName}`} color="primary">{userName}</Typography>
                    <Typography variant="body2" color="textSecondary">{dayjs(created).fromNow()}</Typography>
                    <Typography variant="body1">{content}</Typography>
                    {likeButton}
                    <span>{likeCount} likes</span>
                    <TooltipIconButton tip="Comments">
                        <ChatIcon color="primary" />
                    </TooltipIconButton>
                    <span>{commentCount} comments</span>
                </CardContent>
            </Card>
        )
    }
}

Post.propTypes = {
    likePost: PropTypes.func.isRequired,
    unlikePost: PropTypes.func.isRequired,
    user: PropTypes.object,
    post: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user
})

const mapActionsToProps = {
    likePost,
    unlikePost
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Post));
