/**
 * @Author: Arthur Brunck <arthybck>
 * @Date:   2018-11-06T12:28:41+01:00
 * @Filename: PeopleItem.jsx
 * @Last modified by:   arthybck
 * @Last modified time: 2019-03-03T17:26:28+01:00
 */

import React from "react";
import { Link } from "react-router";
import PropTypes from "prop-types";

import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import LocationOn from "@material-ui/icons/LocationOn";
import Loyalty from "@material-ui/icons/Loyalty";

import AvatarDisplayer from "./AvatarDisplayer";

const styles = {
  root: {
    marginBottom: 18,
    borderStyle: "solid",
    borderColor: "#309FA6",
    borderWidth: 2,
    boxShadow: "none",
    position: "relative",
    height: 350,
    width: 300,
    borderRadius: 5
  },
  linkStyle: {
    textDecoration: "none",
    color: "inherit"
  },
  topCard: {
    height: "45%",
    width: "100%"
  },
  bottomCard: {
    height: "55%",
    width: "100%",
    backgroundColor: "#309FA6",
    position: "relative"
  },
  username: {
    color: "#fff",
    fontWeight: 450,
    marginTop: "10%"
  },
  icon: {
    width: 25,
    height: 25,
    color: "#fff"
  },
  white: {
    color: "#fff"
  },
  avatar: {
    position: "absolute",
    left: 100,
    top: "32%",
    zIndex: 1
  },
  userInfo: {
    paddingTop: "12%",
    marginBottom: "1%"
  },
  tags: {
    position: "absolute",
    bottom: 5
  }
};

/**
 * PeopleItem - This functional component discribe a specific item of the ListItem component
 *
 * @return {element} The react element returned
 */
const PeopleItem = ({ user, classes }) => (
  <Grid item xs={12} md={4} className={classes.divStyle} align="center">
    <Grid className={classes.root}>
      <Grid container justify="center" className={classes.topCard} />
      <Grid item className={classes.avatar} align="center">
        <AvatarDisplayer size={{ width: 100, height: 100 }} user={user} />
      </Grid>
      <Grid className={classes.bottomCard}>
        <Grid align="center" className={classes.userInfo}>
          <Typography variant="display1" className={classes.username}>
            {user.username}
          </Typography>
          <Typography variant="title" className={classes.white}>
            {user.firstname}
          </Typography>
          <Typography variant="title" className={classes.white}>
            {user.lastname}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  </Grid>
);

PeopleItem.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PeopleItem);
