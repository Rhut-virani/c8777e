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
    order: ({ totalImages, text }) => (totalImages > 1 && text ? 2 : 0),
  },
}));

const OtherUserBubble = ({ text, time, otherUser, attachments }) => {
  const totalImages = attachments?.length || 0;
  const classes = useStyles({ totalImages, text });

  return (
    <Box display="flex" mt="1.5rem">
      <Avatar
        alt={otherUser.username}
        src={otherUser.photoUrl}
        className={classes.avatar}
      />
      <Box
        display="flex"
        flexDirection="column"
        className={classes.messageContent}
      >
        <Typography className={classes.usernameDate}>
          {otherUser.username} {time}
        </Typography>
        <MessageContent
          time={time}
          text={text}
          isSender={false}
          attachments={attachments}
          totalImages={totalImages}
        />
      </Box>
    </Box>
  );
};

export default OtherUserBubble;
