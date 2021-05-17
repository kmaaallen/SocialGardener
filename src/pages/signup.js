import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import axios from 'axios';
import { Link } from 'react-router-dom';

//mui components
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
    ...theme.classes
})

class signup extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            userName: '',
            loading: false,
            errors: {}
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            loading: true
        });
        const newUserData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            userName: this.state.userName
        }

        axios.post('/signup', newUserData)
        .then(response => {
            localStorage.setItem('FBIdToken', `Bearer ${response.data.token}`);
            this.setState({
                loading: false
            });
            this.props.history.push('/');
        })
        .catch(error => {
            this.setState({
                errors: error.response.data,
                loading: false
            })
        })

    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        const { classes } = this.props;
        const { errors, loading } = this.state;
        return (
            <Grid container className={classes.form}>
                <Grid item sm />
                <Grid item md>
                    <Typography variant="h4" className={classes.pageTitle}>Sign Up</Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField
                            id="email"
                            name="email"
                            label="Email"
                            type="email"
                            helperText={errors.email}
                            error={errors.email ? true : false}
                            className={classes.textField}
                            value={this.state.email}
                            onChange={this.handleChange}
                            fullWidth />
                        <TextField
                            id="password"
                            name="password"
                            label="Password"
                            type="password"
                            helperText={errors.password}
                            error={errors.password ? true : false}
                            className={classes.textField}
                            value={this.state.password}
                            onChange={this.handleChange}
                            fullWidth />
                            <TextField
                            id="confirmPassword"
                            name="confirmPassword"
                            label="Confirm Password"
                            type="password"
                            helperText={errors.confirmPassword}
                            error={errors.confirmPassword ? true : false}
                            className={classes.textField}
                            value={this.state.confirmPassword}
                            onChange={this.handleChange}
                            fullWidth />
                            <TextField
                            id="userName"
                            name="userName"
                            label="User Name"
                            type="text"
                            helperText={errors.username}
                            error={errors.username ? true : false}
                            className={classes.textField}
                            value={this.state.userName}
                            onChange={this.handleChange}
                            fullWidth />
                            {errors.general && (<Typography variant="body2" className={classes.generalError}>{errors.general}</Typography>)}
                        <Button
                            type="submit"
                            variant="contained"
                            color="secondary"
                            className={classes.button}
                            disabled={loading}>
                                Sign Up
                                {loading && (<CircularProgress size={20} className={classes.loader} color="secondary" />)}
                                </Button>
                    </form>
                    <p className={classes.signUpText}>Already have an account? <Link to="/login" className={classes.signUpLink}>Login here</Link></p>
                </Grid>
                <Grid item sm />
            </Grid>
        )
    }
}

signup.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(signup);
