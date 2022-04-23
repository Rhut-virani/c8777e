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
    padding: '0.5rem',
    fontSize: '0.9rem',
    color: (isSender) => (isSender ? '#91A3C0' : '#FFFFFF'),
    letterSpacing: -0.2,
    fontWeight: 'bold',
  },
  textBubble: {
    maxWidth: '25%',
    width: 'fit-content',
    background: (isSender) =>
      isSender
        ? '#F0F5F9'
        : 'linear-gradient(225deg, #6CC1FF 0%, #3A8DFF 100%)',
    borderRadius: (isSender) =>
      isSender ? '10px 10px 0 10px' : '0 10px 10px 10px',
    overflowWrap: 'break-word',
  },
}));

const MessageContent = ({ attachments, text, isSender }) => {
  const classes = useStyles(isSender);

  return (
    <>
      {!!attachments?.length ? (
        <AttachmentGrid
          text={text}
          attachments={attachments}
          isSender={isSender}
        />
      ) : (
        <Box className={classes.textBubble}>
          <Typography className={classes.text}>{text}</Typography>
        </Box>
      )}
    </>
  );
};

export default MessageContent;
