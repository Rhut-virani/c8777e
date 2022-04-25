import React from 'react';
import { Box, Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  imageWrapper: {
    aspectRatio: '1/1',
    padding: '0.25rem',
    display: 'flex',
  },
  image: {
    objectFit: 'cover',
    width: '100%',
    height: '100%',
    borderRadius: (isSender) =>
      isSender ? '0.5rem 0.5rem 0 0.5rem' : '0 0.5rem 0.5rem 0.5rem',
  },
  extraImages: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    aspectRatio: '1/1',
    fontSize: '2rem',
    color: 'white',
    borderRadius: (isSender) =>
      isSender ? '0.5rem 0.5rem 0 0.5rem' : '0 0.5rem 0.5rem 0.5rem',
  },
}));

const Attachment = ({ image, array, id, extraImages, isSender }) => {
  const classes = useStyles(isSender);
  return (
    <Grid
      item
      xs={array.length === 1 ? 12 : 6}
      className={classes.imageWrapper}
    >
      {/* add overlay if there are more than 4 images  */}
      {!!extraImages && id === 3 ? (
        <Box
          className={classes.extraImages}
          style={{
            background: `linear-gradient(180deg, rgb(58 141 255 / 85%) 0%, rgb(134 185 255 / 85%) 100%), url(${image})`,
            backgroundSize: 'cover',
          }}
        >
          +{extraImages}
        </Box>
      ) : (
        <img src={image} className={classes.image} alt="attachements" />
      )}
    </Grid>
  );
};

export default Attachment;
