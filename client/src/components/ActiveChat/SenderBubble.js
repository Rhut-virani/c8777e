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
    order: ({ totalImages, text }) => (totalImages > 1 && !!text ? 2 : 0),
  },
}));

const SenderBubble = ({ time, text, attachments }) => {
  const totalImages = attachments?.length || 0;
  const classes = useStyles({ totalImages, text });
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
        totalImages={totalImages}
      />
    </Box>
  );
};

export default SenderBubble;
