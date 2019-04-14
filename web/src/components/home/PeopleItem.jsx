/**
 * @Author: Arthur Brunck <arthybck>
 * @Date:   2018-11-06T12:28:41+01:00
 * @Filename: PeopleItem.jsx
 * @Last modified by:   arthybck
 * @Last modified time: 2019-03-03T17:26:28+01:00
 */

import React from 'react';
import PropTypes from 'prop-types';

import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Slide from '@material-ui/core/Slide';

import AvatarDisplayer from './AvatarDisplayer';

function Transition(props) {
  return <Slide direction='up' {...props} />;
}

const styles = theme => ({
  root: {
    marginBottom: 18,
    borderStyle: 'solid',
    borderColor: '#309FA6',
    borderWidth: 2,
    boxShadow: 'none',
    position: 'relative',
    height: 350,
    width: 300,
    borderRadius: 5
  },
  linkStyle: {
    textDecoration: 'none',
    color: 'inherit'
  },
  topCard: {
    height: '45%',
    width: '100%'
  },
  bottomCard: {
    height: '55%',
    width: '100%',
    backgroundColor: '#309FA6',
    position: 'relative'
  },
  username: {
    color: '#fff',
    fontWeight: 450,
    marginTop: '10%'
  },
  icon: {
    width: 25,
    height: 25,
    color: '#fff'
  },
  white: {
    color: '#fff'
  },
  avatar: {
    position: 'absolute',
    left: 100,
    top: '32%',
    zIndex: 1
  },
  userInfo: {
    paddingTop: '12%',
    marginBottom: '1%'
  },
  tags: {
    position: 'absolute',
    bottom: 5
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing.unit,
    top: theme.spacing.unit,
    color: theme.palette.grey[500]
  },
  dialogTitle: {
    borderTop: `1px solid ${theme.palette.divider}`,

    margin: 0,
    padding: theme.spacing.unit * 2
  }
});

/**
 * PeopleItem - This functional component discribe a specific item of the ListItem component
 *
 * @return {element} The react element returned
 */
class PeopleItem extends React.Component {
  state = {
    open: false
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    console.log('skurt');
    this.setState({ open: false });
  };

  render() {
    const { classes, user } = this.props;
    return (
      <Grid
        item
        xs={12}
        md={4}
        style={{ marginLeft: 10 }}
        align='center'
        onClick={this.handleOpen}
      >
        <Grid className={classes.root}>
          <Grid container justify='center' className={classes.topCard} />
          <Grid item className={classes.avatar} align='center'>
            <AvatarDisplayer size={{ width: 100, height: 100 }} user={user} />
          </Grid>
          <Grid className={classes.bottomCard}>
            <Grid align='center' className={classes.userInfo}>
              <Typography variant='display1' className={classes.username}>
                {user.username}
              </Typography>
              <Typography variant='title' className={classes.white}>
                {user.firstname}
              </Typography>
              <Typography variant='title' className={classes.white}>
                {user.lastname}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Dialog
          fullScreen
          open={this.state.open}
          onClose={this.handleClose}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                color='inherit'
                onClick={this.handleClose}
                aria-label='Close'
              >
                <CloseIcon />
              </IconButton>
              <Typography variant='h6' color='inherit' className={classes.flex}>
                {user.username}
              </Typography>
            </Toolbar>
          </AppBar>
          {/* put your content here bro */}
        </Dialog>
      </Grid>
    );
  }
}

PeopleItem.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PeopleItem);
