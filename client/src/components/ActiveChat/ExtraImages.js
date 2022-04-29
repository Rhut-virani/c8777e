import React from 'react';
import { Box, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
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

export const ExtraImages = ({ extraImages, image, isSender }) => {
  const classes = useStyles(isSender);
  return (
    <Box
      className={classes.extraImages}
      style={{
        background: `linear-gradient(180deg, rgb(58 141 255 / 85%) 0%, rgb(134 185 255 / 85%) 100%), url(${image})`,
        backgroundSize: 'cover',
      }}
    >
      +{extraImages}
    </Box>
  );
};
