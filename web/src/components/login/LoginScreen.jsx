/**
 * @Author: Arthur Brunck <arthybck>
 * @Date:   2019-03-03T15:02:45+01:00
 * @Filename: LoginScreen.jsx
 * @Last modified by:   arthybck
 * @Last modified time: 2019-03-03T17:04:04+01:00
 */

import React from 'react';
import { withStyles } from '@material-ui/core';

import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';


import AccountCircle from '@material-ui/icons/AccountCircle';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';


import logo from '../../static/logo.jpeg';
import Login from './Login';
import PeoplePage from '../home/PeoplePage';
import { logout } from '../../modules/commons';

import Register from './Register';

const styles = theme => ({
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  switchButton: {
    margin: theme.spacing.unit,
    width: 300,
    backgroundColor: '#1abc9c',
    '&:hover': {
      backgroundColor: '#16a085'
    }
  }
});

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      button: false,
      login: false,
      badCreds: false,
      token: null,
      anchorEl: null
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }


  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleCloseMenu = () => {
    this.setState({ anchorEl: null });
  };

  handleClick() {
    const { button } = this.state;
    let tmp = !button;
    this.setState({
      button: tmp
    });
  }

  handleLogout() {
    logout().then(() => {
      this.setState({ login: false, token: false });
    })
  }

  handleLogin(token) {
    const { login } = this.state;
    if (token !== 'error') {
      this.setState({
        login: !login,
        token: token
      });
    } else {
      this.setState({
        badCreds: true
      });
    }
  }

  render() {
    const { classes } = this.props;
    const { button, login, token, anchorEl } = this.state;
    const open = Boolean(anchorEl);
    return (
      <Grid container>
        <Grid item xs={12}>
          <AppBar style={{ backgroundColor: '#2c3e50' }} >
            <Toolbar>
              <Typography variant='h6' color='inherit' className={classes.grow}>
                SoSecured
              </Typography>
              {token && (
                <div>
                  <IconButton
                    aria-owns={open ? 'menu-appbar' : undefined}
                    aria-haspopup="true"
                    onClick={this.handleMenu}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={open}
                    onClose={this.handleCloseMenu}
                  >
                    <MenuItem onClick={this.handleLogout}>Disconnect</MenuItem>
                  </Menu>
                </div>
              )}
            </Toolbar>
          </AppBar>
        </Grid>
        {!login ? (
          <Grid
            container
            justify='center'
            alignItems='center'
            alignContent='center'
          >
            <Grid
              container
              item
              xs={12}
              md={8}
              justify='center'
              alignItems='center'
              alignContent='center'
              style={{
                backgroundColor: '#353537',
                paddingTop: '20%',
                paddingBottom: '20%'
              }}
            >
              <img
                src={logo}
                alt='logo'
                style={{
                  width: '50%',
                  height: 'auto'
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              {!button ? (
                <Login
                  handleLogin={this.handleLogin}
                  sendToken={this.sendToken}
                />
              ) : (
                  <Register handleLogin={this.handleLogin} />
                )}
              <Grid
                container
                justify='center'
                alignItems='center'
                alignContent='center'
              >
                <Grid item xs={12}>
                  <Button
                    fullWidth
                    variant='contained'
                    onClick={this.handleClick}
                    className={classes.switchButton}
                  >
                    {!button ? (
                      <Typography style={{ color: 'white' }}>
                        Not registered ?
                      </Typography>
                    ) : (
                        <Typography style={{ color: 'white' }}>
                          Login page
                      </Typography>
                      )}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        ) : (
            <PeoplePage token={token} />
          )}
      </Grid>
    );
  }
}

export default withStyles(styles)(LoginScreen);
