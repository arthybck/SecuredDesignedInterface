/**
 * @Author: Arthur Brunck <arthybck>
 * @Date:   2019-03-03T15:02:45+01:00
 * @Filename: LoginScreen.jsx
 * @Last modified by:   arthybck
 * @Last modified time: 2019-03-03T17:04:04+01:00
 */

import React from "react";
import { withStyles } from "@material-ui/core";

import AppBar from "@material-ui/core/AppBar";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import logo from "../../static/logo.jpeg";
import Login from "./Login";
import Register from "./Register";

const styles = {
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { login } = this.state;
    let tmp = login ? false : true;
    this.setState({
      login: tmp
    });
  }

  render() {
    const { classes } = this.props;
    const { login } = this.state;
    return (
      <Grid container>
        <Grid item xs={12}>
          <AppBar>
            <Toolbar>
              <IconButton
                className={classes.menuButton}
                color="inherit"
                aria-label="Menu"
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" className={classes.grow}>
                SoSecured
              </Typography>
            </Toolbar>
          </AppBar>
        </Grid>
        <Grid
          container
          justify="center"
          alignItems="center"
          alignContent="center"
        >
          <Grid
            container
            item
            xs={12}
            md={8}
            justify="center"
            alignItems="center"
            alignContent="center"
            style={{
              backgroundColor: "#353537",
              paddingTop: "30%",
              paddingBottom: "20%"
            }}
          >
            <img
              src={logo}
              alt="logo"
              style={{
                width: "50%",
                height: "auto"
              }}
            />
          </Grid>
          <Grid item xs={11} md={3}>
            {login ? <Login /> : <Register />}
            <Grid
              container
              justify="center"
              alignItems="center"
              alignContent="center"
            >
              <Grid item xs={12}>
                <Button fullWidth variant="outlined" onClick={this.handleClick}>
                  {login ? (
                    <Typography>Register</Typography>
                  ) : (
                    <Typography>Login</Typography>
                  )}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(LoginScreen);
