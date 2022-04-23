import React from 'react';
import { Box, Typography } from '@material-ui/core';
import MessageContent from './MessageContent';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  date: {
    fontSize: '0.8rem',
    color: '#BECCE2',
    fontWeight: 'bold',
    margin: '0.5rem',
  },
}));
const SenderBubble = ({ time, text, attachments }) => {
  const classes = useStyles();
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="flex-end"
      m="1.5rem 0.5rem 0 0"
    >
      <Typography className={classes.date}>{time}</Typography>
      <MessageContent
        time={time}
        text={text}
        attachments={attachments}
        isSender={true}
      />
    </Box>
  );
};

export default SenderBubble;
