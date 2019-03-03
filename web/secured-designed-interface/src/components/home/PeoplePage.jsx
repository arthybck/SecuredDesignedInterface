/**
 * @Author: Arthur Brunck <arthybck>
 * @Date:   2018-11-06T12:28:41+01:00
 * @Filename: PeoplePage.jsx
 * @Last modified by:   arthybck
 * @Last modified time: 2019-03-03T17:14:01+01:00
 */

import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import PeopleSearch from "./PeopleSearch";

/**
 * PeoplePage - The top-level component at /people
 *              displays a search bar and a list of filtered users with minimum content
 */
class PeoplePage extends React.Component {
  render() {
    return (
      <Grid container justify="center" alignItems="center">
        <Grid item xs={12} sm={10}>
          <Components.PeopleList />
        </Grid>
      </Grid>
    );
  }
}

export default PeoplePage;
