import React from 'react';
import { IconButton, Input, makeStyles } from '@material-ui/core';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';

const useStyles = makeStyles(() => ({
  hiddenInput: {
    display: 'none',
  },
  fileButton: {
    color: '#D1D9E6',
  },
}));

export const UploadButton = ({ handleUpload, isLoading }) => {
  const classes = useStyles(isLoading);

  return (
    <label htmlFor="contained-button-file">
      <Input
        accept="image/*"
        id="contained-button-file"
        type="file"
        disabled={isLoading}
        className={classes.hiddenInput}
        onChange={(e) => {
          handleUpload(e);
        }}
        inputProps={{ multiple: true }}
      />
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
  );
};
