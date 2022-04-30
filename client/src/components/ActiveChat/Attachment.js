import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import { ExtraImages } from './ExtraImages';

const useStyles = makeStyles(() => ({
  imageWrapper: {
    aspectRatio: '1/1',
    padding: ({ totalImages }) => (totalImages > 1 ? '0.25rem' : '0'),
    display: 'flex',
  },
  image: {
    objectFit: 'cover',
    width: '100%',
    height: '100%',
    borderRadius: ({ isSender, totalImages, text }) => {
      if (isSender) {
        if (totalImages === 1 && text) {
          return '0.5rem 0.5rem 0rem 0rem';
        } else {
          return '0.5rem 0.5rem 0rem 0.5rem';
        }
      } else {
        if (totalImages === 1 && text) {
          return '0rem 0.5rem 0rem 0rem';
        } else {
          return '0rem 0.5rem 0.5rem 0.5rem';
        }
      }
    },
  },
}));

const Attachment = ({
  image,
  totalImages,
  index,
  extraImages,
  isSender,
  text,
}) => {
  const classes = useStyles({ isSender, totalImages, text });
  return (
    <Grid item xs={totalImages === 1 ? 12 : 6} className={classes.imageWrapper}>
      {/* add overlay if there are more than 4 images  */}
      {!!extraImages && index === 3 ? (
        <ExtraImages
          extraImages={extraImages}
          image={image}
          isSender={isSender}
        />
      ) : (
        <img src={image} className={classes.image} alt="attachements" />
      )}
    </Grid>
  );
};

export default Attachment;
