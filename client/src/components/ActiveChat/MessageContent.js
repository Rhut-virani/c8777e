import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import AttachmentGrid from './AttachmentGrid';

const useStyles = makeStyles(() => ({
  date: {
    fontSize: '0.8rem',
    color: '#BECCE2',
    fontWeight: 'bold',
    margin: '0.5rem',
  },
  text: {
    padding: '0.5rem 0.75rem',
    fontSize: '0.9rem',
    color: ({ isSender }) => (isSender ? '#91A3C0' : '#FFFFFF'),
    letterSpacing: -0.2,
    fontWeight: 'bold',
  },
  textBubble: {
    maxWidth: '25%',
    width: ({ totalImages }) => (totalImages === 1 ? '25%' : 'fit-content'),
    order: ({ totalImages }) => (totalImages === 1 ? 2 : 0),
    marginBottom: '0.25rem',
    background: ({ isSender }) =>
      isSender
        ? '#F0F5F9'
        : 'linear-gradient(225deg, #6CC1FF 0%, #3A8DFF 100%)',
    borderRadius: ({ isSender, totalImages }) =>
      totalImages === 1
        ? '0 0 10px 10px'
        : isSender
        ? '10px 10px 0 10px'
        : '0 10px 10px 10px',
    overflowWrap: 'break-word',
  },
}));

const MessageContent = ({ attachments, text, isSender, totalImages }) => {
  const classes = useStyles({ isSender, totalImages, text });

  return (
    <>
      {!!text && (
        <Box className={classes.textBubble}>
          <Typography className={classes.text}>{text}</Typography>
        </Box>
      )}
      {!!totalImages && (
        <AttachmentGrid
          text={text}
          attachments={attachments}
          totalImages={totalImages}
          isSender={isSender}
        />
      )}
    </>
  );
};

export default MessageContent;
