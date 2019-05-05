/**
 * @Author: Arthur Brunck <arthybck>
 * @Date:   2019-03-03T15:02:29+01:00
 * @Filename: register.jsx
 * @Last modified by:   arthybck
 * @Last modified time: 2019-03-03T17:39:09+01:00
 */

import React from 'react';
import { withStyles } from '@material-ui/core';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import classNames from 'classnames';

import ErrorIcon from '@material-ui/icons/Error';
import CloseIcon from '@material-ui/icons/Close';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import { login } from '../../modules/commons';

const styles = theme => ({
  error: {
    backgroundColor: theme.palette.error.dark
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit
  },
  fields: {
    width: 300,
    margin: theme.spacing.unit
  }
});

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      credentialError: false,
      showPassword: true

    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ credentialError: false });
  };

  handleClick = () => {
    const { username, password } = this.state;
    const { handleLogin, sendToken } = this.props;
    login({ username, password })
      .then(res => {
        console.log('promise login')
        handleLogin(res.data.token);
      })
      .catch(() => {
        this.setState({ credentialError: true });
        handleLogin('error');
      });
  };

  handleChange = name => e => {
    this.setState({
      [name]: e.target.value
    });
  };

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  render() {
    const { classes } = this.props;
    return (
      <Grid container>
        <Grid item>
          <TextField
            id='outlined-username'
            label='username'
            className={classes.fields}
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
            className={classes.fields}
            value={this.state.password}
            onChange={this.handleChange('password')}
            margin='normal'
            type={this.state.showPassword ? 'password' : 'text'}
            variant='outlined'
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='Toggle password visibility'
                    onClick={this.handleClickShowPassword}
                  >
                    {this.state.showPassword ? (
                      <VisibilityOff />
                    ) : (
                        <Visibility />
                      )}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </Grid>
        <Grid item>
          <Button
            fullWidth
            color='primary'
            variant='contained'
            onClick={this.handleClick}
            className={classes.fields}
          >
            <Typography style={{ color: 'white' }}>Submit</Typography>
          </Button>
        </Grid>

        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
          open={this.state.credentialError}
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
                Please check you password/username and try again
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

export default withStyles(styles)(Login);
