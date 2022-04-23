import React from 'react';
import {
  FormControl,
  FilledInput,
  InputAdornment,
  IconButton,
} from '@material-ui/core';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { UploadPreview } from './UploadPreview';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
  },
  input: {
    height: '4.5rem',
    backgroundColor: '#F0F5F9',
    padding: '0 2rem',
    borderRadius: (isLoading) => (isLoading ? '0 0 0.5rem 0.5rem' : '0.5rem'),
  },
  hiddenInput: {
    display: 'none',
  },
}));

const Input = ({
  uploadedImages,
  text,
  handleChange,
  handleSubmit,
  handleUpload,
  handleClose,
  isLoading,
}) => {
  const classes = useStyles(isLoading);

  return (
    <form className={classes.root} onSubmit={handleSubmit} id="submit-form">
      <FormControl fullWidth hiddenLabel>
        <UploadPreview
          uploadedImages={uploadedImages}
          handleClose={handleClose}
          isLoading={isLoading}
        />
        <FilledInput
          classes={{ root: classes.input }}
          disableUnderline
          placeholder="Type something..."
          value={text}
          name="text"
          onChange={handleChange}
          endAdornment={
            <InputAdornment position="end">
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
                >
                  <FileCopyOutlinedIcon />
                </IconButton>
              </label>
            </InputAdornment>
          }
        />
      </FormControl>
    </form>
  );
};

export default Input;
