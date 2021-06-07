import React, { Fragment } from 'react';
import noImage from '../images/no-image.png';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles'
//MUI stuff
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';

const styles = (theme) => ({ ...theme.classes, });

const PostSkeleton = (props) => {
    const { classes } = props;
    const content = Array.from({ length: 4 }).map((item, index) => (
        <Card className={classes.skeletonCard} key={index}>
            <CardMedia className={classes.skeletonCover} image={noImage} />
            <CardContent className={classes.skeletonContent}>
                <div className={classes.skeletonUserName} />
                <div className={classes.skeletonCreated} />
                <div className={classes.skeletonFullLine} />
                <div className={classes.skeletonFullLine} />
                <div className={classes.skeletonHalfLine} />
            </CardContent>
        </Card>
    ))
    return (<Fragment>{content}</Fragment>)
}

PostSkeleton.propTypes = { classes: PropTypes.object.isRequired }

export default withStyles(styles)(PostSkeleton);