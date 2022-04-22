import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography, Avatar } from '@material-ui/core';
import MessageContent from './MessageContent';

const useStyles = makeStyles(() => ({
  avatar: {
    height: 30,
    width: 30,
    marginRight: 11,
    marginTop: 6,
  },
  messageContent: {
    width: '100%',
  },
  usernameDate: {
    fontSize: 11,
    color: '#BECCE2',
    fontWeight: 'bold',
    marginBottom: 5,
  },
}));

const OtherUserBubble = ({ text, time, otherUser, attachments }) => {
  const classes = useStyles();

  return (
    <Box display="flex" mt="1.5rem">
      <Avatar
        alt={otherUser.username}
        src={otherUser.photoUrl}
        className={classes.avatar}
      />
      <Box className={classes.messageContent}>
        <Typography className={classes.usernameDate}>
          {otherUser.username} {time}
        </Typography>
        <MessageContent
          time={time}
          text={text}
          isSender={false}
          attachments={attachments}
        />
      </Box>
    </Box>
  );
};

export default OtherUserBubble;
