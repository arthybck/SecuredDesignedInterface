/**
 * @Author: Arthur Brunck <arthybck>
 * @Date:   2018-11-06T12:28:41+01:00
 * @Filename: PeopleList.jsx
 * @Last modified by:   arthybck
 * @Last modified time: 2019-03-03T17:20:50+01:00
 */

import React from "react";

import Grid from "@material-ui/core/Grid";

import PeopleItem from "./PeopleItem";

// faire ma requête ici et la foutre dans une variable result

/**
 * PeopleList - This functional component return a list of all users with some informations
 *
 * @param {array}  [results=[]]    The result of the query made to the user collection
 * @param {true}   loadMore        Used to load more users from graphql
 * @param {number}   count         The number of users in the collection currently loaded
 * @param {number}   totalCount    The total number user loaded from graphql
 * @param {object}   classes       Describe de css in js props
 *
 * @returns {element} The element returned by the component
 */
const PeopleList = ({ results =[], classes }) => {
  return (
    <Grid container justify="space-around" alignItems="center">
      {results.map(user => (
        <PeopleItem key={user.username} user={user} />
      ))}
    </Grid>
  );
};

export default PeopleList;
