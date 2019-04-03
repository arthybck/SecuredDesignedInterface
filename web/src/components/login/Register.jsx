/**
 * @Author: Arthur Brunck <arthybck>
 * @Date:   2019-03-03T15:02:29+01:00
 * @Filename: register.jsx
 * @Last modified by:   arthybck
 * @Last modified time: 2019-03-03T17:31:43+01:00
 */

import React from 'react';
import { withStyles } from '@material-ui/core';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { register } from '../../modules/commons';

import classNames from 'classnames';
import ErrorIcon from '@material-ui/icons/Error';
import CloseIcon from '@material-ui/icons/Close';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';

const styles = theme => ({
  success: {
    backgroundColor: green[600]
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  info: {
    backgroundColor: theme.palette.primary.dark
  },
  warning: {
    backgroundColor: amber[700]
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit
  },
  message: {
    display: 'flex',
    alignItems: 'center'
  }
});

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      open: false
    };
  }

  handleClick = () => {
    const { username, email, password } = this.state;
    console.log(username, email, password);
    const { handleLogin } = this.props;
    register({ username, email, password })
      .then(res => {
        handleLogin('ok');
      })
      .catch(() => {
        console.log('error gros');
        this.setState({ open: true });
        handleLogin('error');
      });
  };

  handleChange = name => e => {
    this.setState({
      [name]: e.target.value
    });
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;

    return (
      <Grid container>
        <Grid item>
          <TextField
            id='outlined-email'
            label='email'
            className={classes.textField}
            value={this.state.email}
            onChange={this.handleChange('email')}
            margin='normal'
            variant='outlined'
          />
        </Grid>
        <Grid item>
          <TextField
            id='outlined-username'
            label='username'
            className={classes.textField}
            value={this.state.username}
            onChange={this.handleChange('username')}
            margin='normal'
            variant='outlined'
          />
        </Grid>
        <Grid item>
          <TextField
            id='outlined-password'
            label='password'
            className={classes.textField}
            value={this.state.password}
            onChange={this.handleChange('password')}
            margin='normal'
            variant='outlined'
          />
        </Grid>
        <Grid item>
          <Button onClick={this.handleClick}>
            <Typography>Submit</Typography>
          </Button>
        </Grid>
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          open={this.state.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
        >
          <SnackbarContent
            className={classes.error}
            aria-describedby='client-snackbar'
            message={
              <span id='client-snackbar' className={classes.message}>
                <ErrorIcon
                  className={classNames(classes.icon, classes.iconVariant)}
                />
                The user your trying to create already exists
              </span>
            }
            action={[
              <IconButton
                key='close'
                aria-label='Close'
                color='inherit'
                className={classes.close}
                onClick={this.handleClose}
              >
                <CloseIcon className={classes.icon} />
              </IconButton>
            ]}
          />
        </Snackbar>
      </Grid>
    );
  }
}

export default withStyles(styles)(Register);
