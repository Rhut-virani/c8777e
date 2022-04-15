import React from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  button: {
    padding: '1rem 3rem',
    marginTop: (props) => (props.isForm ? '2rem' : '0'),
    boxShadow: '0px 4px 4px rgba(88, 133, 196, 0.15)',
    '&:hover': {
      backgroundColor: (props) => (props.isForm ? '#295591' : '#ffffff'),
    },
    [theme.breakpoints.down('sm')]: {
      padding: (props) => (props.isForm ? '1rem 3rem' : '1rem 1.5rem'),
    },
  },
}));

const CustomButton = (props) => {
  const { buttonText, color, isForm } = props;
  const classes = useStyles(props);

  return (
    <Button
      color={color}
      variant="contained"
      size="large"
      type={isForm ? 'submit' : 'button'}
      className={classes.button}
    >
      {buttonText}
    </Button>
  );
};

export default CustomButton;
