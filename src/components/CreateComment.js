import React, { Component, Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

//MUI stuff
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

//Redux stuff
import { connect } from 'react-redux';
import { createComment } from '../redux/actions/dataActions';

const styles = (theme) => ({
    ...theme.classes,

    button: {
        float: 'right',
        margin: '15px'
    }
})

class CreateComment extends Component {
    state = {
        content: ''
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.createComment(this.props.postId, { content: this.state.content });
    }

    render() {
        const { classes, UI: { errors }, authenticated } = this.props;
        const commentFormMarkup = authenticated && (
            <Grid item sm={12}>
                <form onSubmit={this.handleSubmit}>
                    <TextField
                        name="content"
                        type="text"
                        label="Comment on post"
                        error={errors ? true : false}
                        helperText={errors ? errors.comment : '' }
                        value={this.state.content}
                        onChange={this.handleChange}
                        fullWidth
                        className={classes.Textfield}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.button}>
                        Submit
                        </Button>
                    <hr className={classes.visibleSeparator} />
                </form>
            </Grid>
        );
        return (
            <Fragment>
                { commentFormMarkup}
            </Fragment>

        )
    }
}

CreateComment.propTypes = {
    classes: PropTypes.object.isRequired,
    createComment: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,
    authenticated: PropTypes.bool.isRequired,
    postId: PropTypes.string.isRequired
}

const mapStateToProps = (state) => ({
    UI: state.UI,
    authenticated: state.user.authenticated,
})

const mapActionsToProps = {
    createComment
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(CreateComment));


