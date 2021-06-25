import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
//MUI stuff
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
//Redux
import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/userActions';
import { clearErrors } from '../redux/actions/dataActions';

const styles = theme => ({ ...theme.classes });

class login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() { this.props.clearErrors(); }

    handleSubmit = (event) => {
        event.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        }
        this.props.loginUser(userData, this.props.history);
    }

    handleChange = (event) => { this.setState({ [event.target.name]: event.target.value }); }

    render() {
        const { classes, UI: { loading, errors } } = this.props;
        return (
            <Grid container className={classes.textAlignCenter}>
                <Grid item sm />
                <Grid item md>
                    <Typography variant="h4" className={classes.marginVertical15}>Login</Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField
                            id="email"
                            name="email"
                            label="Email"
                            type="email"
                            error={errors && errors.email ? true : false}
                            helperText={errors && errors.email ? errors.email : ''}
                            className={classes.marginVertical15}
                            value={this.state.email}
                            onChange={this.handleChange}
                            fullWidth />
                        <TextField
                            id="password"
                            name="password"
                            label="Password"
                            type="password"
                            error={errors && errors.password ? true : false}
                            helperText={errors && errors.password ? errors.password : ''}
                            className={classes.marginVertical15}
                            value={this.state.password}
                            onChange={this.handleChange}
                            fullWidth />
                        {(errors && errors.general) && (<Typography variant="body2" className={classes.generalError}>{errors.general}</Typography>)}
                        <Button
                            type="submit"
                            variant="contained"
                            color="secondary"
                            className={classes.button}
                            disabled={loading}>
                            Login
                            {loading && (<CircularProgress size={20} className={classes.positionAbsolute} color="secondary" />)}
                        </Button>
                    </form>
                    <p className={classes.signUpText}>Don't have an account? <Link to="/signup" className={classes.signUpLink}>Sign up here</Link></p>
                </Grid>
                <Grid item sm />
            </Grid>
        )
    }
}

login.propTypes = {
    classes: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    clearErrors: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
});

const mapActionsToProps = {
    loginUser,
    clearErrors
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(login));
