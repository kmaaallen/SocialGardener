import React, { Fragment } from 'react';
import noImage from '../images/no-image.png';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles'

//MUI stuff
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';

const styles = (theme) => ({
    ...theme.classes,
    auto: {
        marginLeft: 'auto',
        marginRight: 'auto',
    }
});

const PostSkeleton = (props) => {
    const { classes } = props;

    return (
        <Fragment>
            <Card className={classes.skeletonCard}>
                <CardContent className={classes.skeletonContent}>
                    <CardMedia className={classes.skeletonCover} image={noImage} />
                    <div className={classes.skeletonUserName + ' ' + classes.auto} />
                <div className={classes.skeletonFullLine} />
                    <div className={classes.skeletonFullLine} />
                    <div className={classes.fskeletonFullLine} />
                </CardContent>
            </Card>
        </Fragment>
    )
}

PostSkeleton.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(PostSkeleton);