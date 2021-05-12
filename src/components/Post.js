import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import Link from 'react-router-dom/Link';

const styles = {
    card: {
        display: 'flex',
        marginBottom: '20px',
    },
    image: {
        minWidth: '150px',
    },
    content: {
        padding: 25,
        objectFit: 'cover'
    }
}

class Post extends Component {
    render() {
        const { classes, post: { content, created, userImage, userName, postId, likeCount, commentCount } } = this.props;
        return (
            <Card className={classes.card}>
                <CardMedia
                    image={userImage}
                    title='Profile Image'
                    className={classes.image} />
                <CardContent className={classes.content}>
                    <Typography variant="h5" component={ Link } to={`/users/${userName}`} color="primary">{userName}</Typography>
                    <Typography variant="body2" color="textSecondary">{created}</Typography>
                    <Typography variant="body1">{content}</Typography>
                </CardContent>
            </Card>
        )
    }
}

export default withStyles(styles)(Post);
