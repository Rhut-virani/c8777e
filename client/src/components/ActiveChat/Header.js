import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, Typography } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    boxShadow: '0 2px 20px 0 rgba(88,133,196,0.10)',
  },
  content: {
    marginLeft: '24px',
  },
  username: {
    fontSize: '20px',
    letterSpacing: -0.29,
    fontWeight: 'bold',
    marginRight: 14,
  },
  statusText: {
    fontSize: 12,
    color: '#BFC9DB',
    letterSpacing: -0.17,
  },
  statusDot: {
    height: 8,
    width: 8,
    borderRadius: '50%',
    marginRight: 5,
    backgroundColor: '#D0DAE9',
  },
  online: {
    background: '#1CED84',
  },
  ellipsis: {
    color: '#95A7C4',
    marginRight: 24,
    opacity: 0.5,
  },
}));

const Header = ({ username, online }) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Grid
        container
        item
        xs={10}
        alignItems="center"
        className={classes.content}
      >
          <Typography className={classes.username}>{username}</Typography>
          <Box className={`${classes.statusDot} ${online && classes.online}`} />
          <Typography className={classes.statusText}>
            {online ? 'Online' : 'Offline'}
          </Typography>
      </Grid>
      <MoreHorizIcon classes={{ root: classes.ellipsis }} />
    </Grid>
  );
};

export default Header;
