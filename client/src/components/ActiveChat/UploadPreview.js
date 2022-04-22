import {
  Box,
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
    borderRadius:'8px 8px 0 0'
  },
  previewImage: {
    width: '20%',
    aspectRatio: '1 / 1',
    objectFit: 'cover',
    marginRight: '2rem',
  },
  close: {
    position: 'absolute',
    height: '1rem',
    width: '1rem',
    top: '-0.5rem',
    right: '-0.5rem',
  },
}));

export const UploadPreview = ({ uploadedImages, handleClose, isLoading }) => {
  const classes = useStyles();
  const imageData = uploadedImages.map((image, i) => {
    return (
      <img key={i} src={image} alt="preview" className={classes.previewImage} />
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
            <CancelIcon />
          </IconButton>
          {imageData}
          {isLoading && (
            <Box
              display='flex'
              justifyContent="center"
              alignItems="center"
              bgcolor="#dae2eb"
              className={classes.previewImage}
            >
              <CircularProgress />
            </Box>
          )}
        </>
      </Grid>
    </Slide>
  );
};
