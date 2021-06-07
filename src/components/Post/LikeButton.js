import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
//Components
import TooltipIconButton from '../../util/TooltipIconButton';
//Icons
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
//Redux Stuff
import { connect } from 'react-redux';
import { likePost, unlikePost } from '../../redux/actions/dataActions';


class LikeButton extends Component {

    likedPost = () => {
        if (this.props.user.likes && this.props.user.likes.find(like => like.postId === this.props.postId)) {
            return true;
        } else {
            return false;
        }
    }

    likePost = () => {
        this.props.likePost(this.props.postId);
    }

    unlikePost = () => {
        this.props.unlikePost(this.props.postId);
    }

    render() {
        const { user: { authenticated } } = this.props;
        const likeButton = !authenticated ? (
            <Link to="/login">
                <TooltipIconButton tip="Like">
                    <FavoriteBorderIcon color="primary" />
                </TooltipIconButton>
            </Link>
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
            likeButton
        )
    }
}

LikeButton.propTypes = {
    likePost: PropTypes.func.isRequired,
    unlikePost: PropTypes.func.isRequired,
    user: PropTypes.object,
    postId: PropTypes.string.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user,
})

const mapActionsToProps = {
    likePost,
    unlikePost
}

export default connect(mapStateToProps, mapActionsToProps)(LikeButton);
