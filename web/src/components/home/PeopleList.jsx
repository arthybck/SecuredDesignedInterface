/**
 * @Author: Arthur Brunck <arthybck>
 * @Date:   2018-11-06T12:28:41+01:00
 * @Filename: PeopleList.jsx
 * @Last modified by:   arthybck
 * @Last modified time: 2019-03-03T17:20:50+01:00
 */

import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

import PeopleItem from './PeopleItem';
import { listUsers } from '../../modules/commons';

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2
  }
});

/**
 * PeopleList - This functional component return a list of all users with some informations
 *
 * @param {array}  [users=[]]    The result of the query made to the user collection
 * @param {true}   loadMore        Used to load more users from graphql
 * @param {number}   count         The number of users in the collection currently loaded
 * @param {number}   totalCount    The total number user loaded from graphql
 * @param {object}   classes       Describe de css in js props
 *
 * @returns {element} The element returned by the component
 */
class PeopleList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      loading: true,
      completed: 0
    };
    const { token } = this.props;

    listUsers(token).then(res => {
      this.setState({ users: res.data, loading: false, completed: 100 });
    });
  }

  componentDidMount() {
    this.timer = setInterval(this.progress, 20);
  }

  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 1 });
  };

  render() {
    const { users, loading } = this.state;
    const { classes } = this.props;
    return (
      <Grid
        container
        justify='space-around'
        alignItems='center'
        style={{ paddingTop: 100 }}
      >
        {!loading
          ? users.map(user => <PeopleItem key={user.username} user={user} />)
          : <CircularProgress
            className={classes.progress}
            variant='determinate'
            value={this.state.completed}
          />}
      </Grid>
    );
  }
}

PeopleList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PeopleList);
