import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';

//components
import Post from '../components/Post';
import Profile from '../components/Profile';
import PostSkeleton from '../util/PostSkeleton';

//redux
import { connect } from 'react-redux';
import { getPosts } from '../redux/actions/dataActions';

class home extends Component {
    constructor() {
        super();
        this.state= {
            posts: null
        }
    }

    componentDidMount(){
        this.props.getPosts();
    }

    render() {
        const { posts, loading } = this.props.data;
        let recentPosts = !loading ? (
            posts.map((post) => <Post key={post.postId} post={post}/>)
        ) : <PostSkeleton />
        return (
            <Grid container spacing={3}>
                <Grid item sm={8} xs={12}>
                    {recentPosts}
                </Grid>
                <Grid item sm={4} xs={12}>
                    <Profile />
                </Grid>
            </Grid>
        )
    }
}

home.propTypes = {
    getPosts: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    data: state.data
});

const mapActionsToProps = {
    getPosts
}

export default connect(mapStateToProps, mapActionsToProps)(home);
