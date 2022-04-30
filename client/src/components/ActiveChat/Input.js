import React from 'react';
import { FormControl, FilledInput, InputAdornment } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { UploadPreview } from './UploadPreview';
import { UploadButton } from './UploadButton';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
  },
  input: {
    height: '4.5rem',
    backgroundColor: '#F0F5F9',
    padding: '0 2rem',
    borderRadius: ({ uploadedImages, isLoading }) =>
      uploadedImages.length || isLoading ? '0 0 0.5rem 0.5rem' : '0.5rem',
    color: '#9CADC8',
    fontWeight: 600,
    '&.Mui-focused,&:hover': {
      backgroundColor: '#e1ecf5',
    },
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
  handleRemove,
}) => {
  const classes = useStyles({ uploadedImages, isLoading });

  return (
    <form className={classes.root} onSubmit={handleSubmit} id="submit-form">
      <FormControl fullWidth hiddenLabel>
        <UploadPreview
          uploadedImages={uploadedImages}
          handleClose={handleClose}
          isLoading={isLoading}
          handleRemove={handleRemove}
        />
        <FilledInput
          name="text"
          placeholder="Type something..."
          value={text}
          onChange={handleChange}
          classes={{ root: classes.input }}
          autoFocus
          disableUnderline
          endAdornment={
            <InputAdornment position="end">
              <UploadButton handleUpload={handleUpload} isLoading={isLoading} />
            </InputAdornment>
          }
        />
      </FormControl>
    </form>
  );
};

export default Input;
