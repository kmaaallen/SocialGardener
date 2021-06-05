import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Post from '../components/Post';
import StaticProfile from '../components/StaticProfile';

//MUI stuff
import Grid from '@material-ui/core/Grid';

//Redux stuff
import { connect } from 'react-redux';
import { getUserData } from '../redux/actions/dataActions';

class user extends Component {
    state = {
        profile: null
    }
    componentDidMount = () => {
        const user = this.props.match.params.userName;
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
        const { posts, loading  } = this.props.data;
        const postsMarkup = loading ? (
        <p>Loading data...</p>
        ) : posts == null ? (
        <p>This user has no posts</p>
        ) : posts.map((post) => {
            return (<Post key={post.postId} post={post} />)
        })
        return (
            <Grid container spacing={3}>
            <Grid item sm={8} xs={12}>
                {postsMarkup}
            </Grid>
            <Grid item sm={4} xs={12}>
                {this.state.profile == null ? (
                    <p>Loading profile...</p>
                ) : (
                    <StaticProfile profile={this.state.profile} />
                ) }
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
