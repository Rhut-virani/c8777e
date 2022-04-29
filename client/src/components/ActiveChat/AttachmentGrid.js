import React from 'react';
import { Grid } from '@material-ui/core';
import Attachment from './Attachment';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  attachmentBubble: {
    width: '25%',
  },
}));

const AttachmentGrid = ({ text, attachments, isSender, totalImages }) => {
  const classes = useStyles({ isSender, text, attachments });

  const extraImages = totalImages > 4 ? totalImages - 3 : 0;

  // only displaying 4 images if there are more than 4 images
  const attachmentData = attachments?.slice(0, 4).map((image, i, array) => {
    // extracting filename from url and using that as key
    const id = image.match(/([^/]+)(?=\.\w+$)/)[0];
    return (
      <Attachment
        key={id}
        index={i}
        image={image}
        totalImages={totalImages}
        text={text}
        extraImages={extraImages}
        isSender={isSender}
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
    </Grid>
  );
};

export default AttachmentGrid;
