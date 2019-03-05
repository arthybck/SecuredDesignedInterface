/**
 * @Author: Arthur Brunck <arthybck>
 * @Date:   2019-03-03T15:02:45+01:00
 * @Filename: LoginScreen.jsx
 * @Last modified by:   arthybck
 * @Last modified time: 2019-03-03T17:04:04+01:00
 */

import React from "react";
import {withStyles} from "@material-ui/core";

import AppBar from "@material-ui/core/AppBar";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';

import logo from "../../static/logo.jpeg";
import Login from "./Login";
import PeoplePage from "../home/PeoplePage";

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
            button: false,
            login: false,
            badCreds: false,
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        const {button} = this.state;
        let tmp = !button;
        this.setState({
            button: tmp
        });
    }

    handleClose = (event) => {
        this.setState({badCreds: false});
    };

    handleLogin(status) {
        const {login} = this.state;
        if (status === 'ok') {
            let tmp = !login;
            this.setState({
                login: tmp
            });
        } else {
            this.setState({
                badCreds: true
            });
        }

    }

    render() {
        const {classes} = this.props;
        const {button, login} = this.state;
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
                                <MenuIcon/>
                            </IconButton>
                            <Typography variant="h6" color="inherit" className={classes.grow}>
                                SoSecured
                            </Typography>
                        </Toolbar>
                    </AppBar>
                </Grid>
                {!login ? <Grid
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
                            {button ? <Login handleLogin={this.handleLogin}/> : <Register handleLogin={this.handleLogin}/>}
                            <Grid
                                container
                                justify="center"
                                alignItems="center"
                                alignContent="center"
                            >
                                <Grid item xs={12}>
                                    <Button fullWidth variant="outlined" onClick={this.handleClick}>
                                        {button ? (
                                            <Typography>Register</Typography>
                                        ) : (
                                            <Typography>Login</Typography>
                                        )}
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    : <PeoplePage/>}
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.badCreds}
                    autoHideDuration={6000}
                    onClose={this.handleClose}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">Please verify your username/password</span>}
                    action={[
                        <Button key="undo" color="secondary" size="small" onClick={this.handleClose}>
                            Close
                        </Button>,
                        <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            className={classes.close}
                            onClick={this.handleClose}
                        >
                            <CloseIcon/>
                        </IconButton>,
                    ]}
                />
            </Grid>
        );
    }
}

export default withStyles(styles)(LoginScreen);
