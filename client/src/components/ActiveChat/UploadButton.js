import React from 'react';
import { IconButton, makeStyles } from '@material-ui/core';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';

const useStyles = makeStyles(() => ({
  hiddenInput: {
    display: 'none',
  },
  fileButton: {
    color: '#D1D9E6',
  },
}));

export const UploadButton = ({handleUpload, isLoading}) => {
  const classes = useStyles(isLoading);

  return (
    <>
      <input
        accept="image/*"
        className={classes.hiddenInput}
        id="contained-button-file"
        multiple
        type="file"
        onChange={(e) => {
          handleUpload(e);
        }}
        disabled={isLoading}
      />
      <label htmlFor="contained-button-file">
        <IconButton
          color="secondary"
          aria-label="upload picture"
          component="span"
          disabled={isLoading}
          className={classes.fileButton}
        >
          <FileCopyOutlinedIcon />
        </IconButton>
      </label>
    </>
  );
};
