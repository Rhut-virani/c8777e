import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import Attachment from './Attachment';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  text: {
    fontSize: '0.9rem',
    color: ({ isSender }) => (isSender ? '#91A3C0' : '#FFFFFF'),
    letterSpacing: '-0.0125rem',
    padding: '0 .25rem .5rem .5rem',
    fontWeight: 'bold',
  },
  attachmentBubble: {
    width: '25%',
    background: ({ isSender, text }) =>
      // if there are only images and no text then dont add background
      !text
        ? ''
        : isSender
        ? '#F0F5F9'
        : 'linear-gradient(225deg, #6CC1FF 0%, #3A8DFF 100%)',
    borderRadius: ({ isSender }) =>
      isSender ? '10px 10px 0px 10px' : '0px 10px 10px 10px',
  },
}));

const AttachmentGrid = ({ text, attachments, isSender }) => {
  const classes = useStyles({ isSender, text });

  const extraImages = attachments?.length > 4 ? attachments.length - 3 : 0;

  // only displaying 4 images if there are more than 4 images
  const attachmentData = attachments?.slice(0, 4).map((image, i, array) => {
    return (
      <Attachment
        key={i}
        id={i}
        image={image}
        array={array}
        extraImages={extraImages}
      />
    );
  });
  return (
    <Grid
      container
      justifyContent="flex-start"
      className={classes.attachmentBubble}
    >
      {attachmentData}
      {!!text && (
        <Grid item xs={12}>
          <Typography className={classes.text}>{text}</Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default AttachmentGrid;
