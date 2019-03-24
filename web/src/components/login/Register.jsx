/**
 * @Author: Arthur Brunck <arthybck>
 * @Date:   2019-03-03T15:02:29+01:00
 * @Filename: register.jsx
 * @Last modified by:   arthybck
 * @Last modified time: 2019-03-03T17:31:43+01:00
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

import { register } from "../commons";

const styles = {
  button: {}
};

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: ""
    };
  }

  handleClick = () => {
    const { username, email, password } = this.state;
    console.log(username, email, password);
    const { handleLogin } = this.props;
    register({ username, email, password }).then(() => {
      handleLogin('ok');
    }).catch(() => {
      handleLogin('error')
    });
  };

  handleChange = name => e => {
    this.setState({
      [name]: e.target.value
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <Grid container>
        <Grid item>
          <TextField
            id="outlined-email"
            label="email"
            className={classes.textField}
            value={this.state.email}
            onChange={this.handleChange("email")}
            margin="normal"
            variant="outlined"
          />
        </Grid>
        <Grid item>
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
        <Grid item>
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
        <Grid item>
          <Button onClick={this.handleClick}>
            <Typography>Submit</Typography>
          </Button>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(Register);
