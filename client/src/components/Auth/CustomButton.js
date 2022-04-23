import React from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  formButton: {
    minWidth: '10rem',
    minHeight: '3.5rem',
    marginTop: '2rem',
    boxShadow: '0px 4px 4px rgba(88, 133, 196, 0.15)',
    '&:hover': {
      backgroundColor: '#295591',
    },
    fontSize: '1rem',
    fontWeight: 700,
  },
  headerButton: {
    minWidth: '8.75rem',
    padding: '0 2rem',
    minHeight: '3.375rem',
    boxShadow: '0px 4px 4px rgba(88, 133, 196, 0.15)',
    '&:hover': {
      backgroundColor: '#ffffff',
    },
    fontSize: '0.875rem',
    fontWeight: 600,
  },
}));

const CustomButton = ({ buttonText, color, isForm }) => {
  const classes = useStyles();

  return (
    <Button
      color={color}
      variant="contained"
      size="large"
      type={isForm ? 'submit' : 'button'}
      className={isForm ? classes.formButton : classes.headerButton}
    >
      {buttonText}
    </Button>
  );
};

export default CustomButton;
