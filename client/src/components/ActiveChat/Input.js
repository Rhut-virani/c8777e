import React from 'react';
import {
  FormControl,
  FilledInput,
  InputAdornment,
  IconButton,
  Grid,
} from '@material-ui/core';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    justifySelf: 'flex-end',
    marginTop: 15,
  },
  input: {
    height: 70,
    backgroundColor: '#E4ECF6',
    borderRadius: 8,
    padding: '0 2rem'
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
                />
                <label htmlFor="contained-button-file">
                  <IconButton
                    color="secondary"
                    aria-label="upload picture"
                    component="span"
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
