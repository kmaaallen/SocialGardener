import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';

import axios from 'axios';

//components
import Post from '../components/Post';

class home extends Component {
    state = {
        posts: null
    }

    componentDidMount(){
        axios.get('/posts')
        .then((response) => {
            this.setState({
                posts: response.data
            })
        })
        .catch(error => {
            console.log(error);
        })
    }

    render() {
        let recentPosts = this.state.posts ? (
            this.state.posts.map((post) => <Post key={post.postId} post={post}/>)
        ) : <p>Loading ...</p>
        return (
            <Grid container spacing={3}>
                <Grid item sm={8} xs={12}>
                    {recentPosts}
                </Grid>
                <Grid item sm={4} xs={12}>
                    <p>Profile...</p>
                </Grid>
            </Grid>
        )
    }
}

export default home
