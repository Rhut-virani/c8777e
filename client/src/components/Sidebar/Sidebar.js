import React from 'react';
import { Box, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Search, Chat, CurrentUser } from './index';

const useStyles = makeStyles(() => ({
  root: {
    padding: '1.5rem',
    maxHeight: '100%',
  },
  title: {
    fontSize: '1.25rem',
    letterSpacing: -0.29,
    fontWeight: 'bold',
  },
  converations:{
    height: '75%',
    overflowY: 'scroll',
    scrollbarWidth: "none" ,
    "&::-webkit-scrollbar": {
      display: "none"
    },

  },
}));

const Sidebar = ({
  handleChange,
  searchTerm,
  conversations = [],
  user,
  setActiveChat,
  logout,
}) => {
  const classes = useStyles();

  return (
    <Grid
      container
      item
      xs={4}
      alignContent="flex-start"
      spacing={1}
      className={classes.root}
    >
      <Grid item xs={12}>
        <CurrentUser user={user} logout={logout} />
      </Grid>
      <Grid item xs={12}>
        <Typography className={classes.title}>Chats</Typography>
      </Grid>
      <Grid item xs={12}>
        <Search handleChange={handleChange} />
      </Grid>
      <Grid item xs={12} className={classes.converations}>
        {conversations
          .filter((conversation) =>
            conversation.otherUser.username.includes(searchTerm),
          )
          .map((conversation) => {
            return (
                <Chat
                  conversation={conversation}
                  key={conversation.otherUser.username}
                  setActiveChat={setActiveChat}
                />
                );
              })}
      </Grid>
    </Grid>
  );
};

export default Sidebar;
