import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
//Components
import Post from '../components/Post/Post';
import StaticProfile from '../components/Profile/StaticProfile';
import PostSkeleton from '../util/PostSkeleton';
import ProfileSkeleton from '../util/ProfileSkeleton';
//MUI stuff
import Grid from '@material-ui/core/Grid';
//Redux stuff
import { connect } from 'react-redux';
import { getUserData } from '../redux/actions/dataActions';

class user extends Component {
    state = {
        profile: null,
        postIdParam: null
    }
    componentDidMount = () => {
        const user = this.props.match.params.userName;
        const postIdParam = this.props.match.params.postId;

        if (postIdParam) {
            this.setState({
                postIdParam: postIdParam
            });
        }

        this.props.getUserData(user);
        axios.get(`/user/${user}`)
            .then(response => {
                this.setState({
                    profile: response.data.user
                })
            })
            .catch(error => {
                console.error(error);
            })
    }

    render() {
        const { posts, loading } = this.props.data;
        const { postIdParam } = this.state;
        const postsMarkup = loading ? (
            <PostSkeleton />
        ) : posts == null ? (
            <p>This user has no posts</p>
        ) : !postIdParam ? (
            posts.map((post) => { return (<Post key={post.postId} post={post} />) })
        ) : (
            posts.map((post) => {
                if (post.postId !== postIdParam) {
                    return (<Post key={post.postId} post={post} />)
                } else {
                    return (<Post key={post.postId} post={post} openDialog />)
                }
            })
        )
        return (
            <Grid container spacing={3}>
                <Grid item sm={8} xs={12}>
                    {postsMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                    {this.state.profile == null ? (
                        <ProfileSkeleton />
                    ) : (
                        <StaticProfile profile={this.state.profile} />
                    )}
                </Grid>
            </Grid>
        )
    }
}

user.propTypes = {
    data: PropTypes.object.isRequired,
    getUserData: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    data: state.data
})

const mapActionsToProps = {
    getUserData
}

export default connect(mapStateToProps, mapActionsToProps)(user)
