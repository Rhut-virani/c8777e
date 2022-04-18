import React from 'react';
import {
  FormControl,
  FilledInput,
  InputAdornment,
  IconButton,
} from '@material-ui/core';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import SendIcon from '@material-ui/icons/Send';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    justifySelf: 'flex-end',
    marginTop: 15,
  },
  input: {
    height: 70,
    backgroundColor: '#F4F6FA',
    borderRadius: 8,
    marginBottom: 20,
  },
  hiddenInput: {
    display: 'none',
  },
}));

const Input = ({
  uploadURL,
  text,
  handleChange,
  handleSubmit,
  handleUpload,
}) => {
  const classes = useStyles();

  return (
    <form className={classes.root} onSubmit={handleSubmit} id="submit-form">
      <FormControl fullWidth hiddenLabel>
        <FilledInput
          classes={{ root: classes.input }}
          disableUnderline
          placeholder="Type something..."
          value={text}
          name="text"
          onChange={handleChange}
          startAdornment={
            <InputAdornment position="start">
              <input
                accept="image/*"
                className={classes.hiddenInput}
                id="contained-button-file"
                multiple
                type="file"
                onChange={(e) => {
                  handleUpload(e);
                }}
              />
              <label htmlFor="contained-button-file">
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                >
                  <PhotoCameraIcon />
                </IconButton>
              </label>
            </InputAdornment>
          }
          endAdornment={
            <InputAdornment position="end">
              <IconButton type="submit" color="primary">
                <SendIcon />
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    </form>
  );
};

export default Input;
