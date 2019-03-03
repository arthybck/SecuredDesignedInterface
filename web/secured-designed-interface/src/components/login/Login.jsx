/**
 * @Author: Arthur Brunck <arthybck>
 * @Date:   2019-03-03T15:02:29+01:00
 * @Filename: register.jsx
 * @Last modified by:   arthybck
 * @Last modified time: 2019-03-03T17:39:09+01:00
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

import { login } from "../commons";

const styles = {
  button: {}
};

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleClick = () => {
    const { username, password } = this.state;
    login({ username, password });
  };

  handleChange = name => e => {
    this.setState({
      [name]: e.target.value
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <Grid
        container
        justify="space-around"
        alignItems="center"
        alignContent="space-around"
      >
        <Grid item xs={10}>
          <TextField
            id="outlined-username"
            label="username"
            className={classes.textField}
            value={this.state.username}
            onChange={this.handleChange("username")}
            margin="normal"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={10}>
          <TextField
            id="outlined-password"
            label="password"
            className={classes.textField}
            value={this.state.password}
            onChange={this.handleChange("password")}
            margin="normal"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={10}>
          <Button fullWidth variant="outlined" onClick={this.handleClick}>
            <Typography>Submit</Typography>
          </Button>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(Login);
