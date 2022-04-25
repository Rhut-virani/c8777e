import {
  CircularProgress,
  Grid,
  IconButton,
  makeStyles,
  Slide,
} from '@material-ui/core';
import React from 'react';
import CancelIcon from '@material-ui/icons/Cancel';

const useStyles = makeStyles(() => ({
  imagePreviewWrapper: {
    maxWidth: '100%',
    overflowX: 'scroll',
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    padding: '2rem',
    backgroundColor: '#F0F5F9',
    borderRadius: '.5rem .5rem 0 0',
    borderBottom: '1px #D1D9E6 solid',
  },
  imageBox: {
    aspectRatio: '1 / 1',
    marginRight: '2rem',
    position: 'relative',
  },
  previewImage: {
    height: '100%',
    aspectRatio: '1 / 1',
    objectFit: 'cover',
  },
  loadingBox: {
    width: '25%',
    aspectRatio: '1 / 1',
    objectFit: 'cover',
    backgroundColor: '#dae2eb',
  },
  close: {
    position: 'absolute',
    height: '1rem',
    width: '1rem',
    top: '-0.5rem',
    right: '-0.5rem',
  },
  removeImage: {
    position: 'absolute',
    height: '1rem',
    width: '1rem',
    top: '-0.5rem',
    left: '-0.5rem',
    backgroundColor: '#3A8DFF',
    '&:hover': {
      backgroundColor: '#396bb0',
    },
  },
}));

export const UploadPreview = ({
  uploadedImages,
  handleClose,
  isLoading,
  handleRemove,
}) => {
  const classes = useStyles();
  const imageData = uploadedImages.map((image) => {
    return (
      <Grid container item xs={2} className={classes.imageBox} key={image.id}>
        <IconButton
          className={classes.removeImage}
          onClick={() => handleRemove(image)}
        >
          <CancelIcon color="secondary" />
        </IconButton>
        <img className={classes.previewImage} src={image.url} alt="preview" />
      </Grid>
    );
  });
  return (
    <Slide
      direction="up"
      in={isLoading || !!uploadedImages.length}
      mountOnEnter
      unmountOnExit
    >
      <Grid
        container
        justifyContent="flex-start"
        wrap="nowrap"
        className={classes.imagePreviewWrapper}
      >
        <>
          <IconButton className={classes.close} onClick={handleClose}>
            <CancelIcon color="primary" fontSize="large" />
          </IconButton>
          {imageData}
          {isLoading && (
            <Grid
              container
              item
              xs={2}
              justifyContent="center"
              alignItems="center"
              className={classes.loadingBox}
            >
              <CircularProgress color="primary" />
            </Grid>
          )}
        </>
      </Grid>
    </Slide>
  );
};
