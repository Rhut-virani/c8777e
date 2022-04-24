import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { BadgeAvatar } from './index';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

const useStyles = makeStyles(() => ({
  root: {
    padding: '1rem 0',
  },
  subContainer: {},
  username: {
    letterSpacing: -0.23,
    fontSize: '1rem',
    fontWeight: 'bold',
    marginLeft: '0.5rem',
  },
  ellipsis: {
    color: '#95A7C4',
    marginRight: '1.5rem',
    opacity: 0.5,
  },
}));

const CurrentUser = ({ user }) => {
  const classes = useStyles();

  return (
    <Grid container item className={classes.root} alignItems="center">
      <Grid container item xs={2} alignItems="center">
        <BadgeAvatar photoUrl={user?.photoUrl} online={true} />
      </Grid>
      <Grid
        container
        item
        xs={10}
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography className={classes.username}>{user?.username}</Typography>
        <MoreHorizIcon classes={{ root: classes.ellipsis }} />
      </Grid>
    </Grid>
  );
};

export default CurrentUser;
