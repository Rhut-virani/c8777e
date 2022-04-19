import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import CustomButton from './CustomButton';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  formWrapper: {
    minWidth: '23.75rem',
    minHeight: '22.375rem',
    alignContent: 'center',
    marginRight: '1.5rem',
    [theme.breakpoints.down('sm')]: {
      minWidth: '50%',
    },
  },
  greetings: {
    fontWeight: 600,
    fontSize: '1.625rem',
    marginLeft: '0.5rem',
  },
}));

const AuthForm = ({ children, handleSubmit, greetingsText, buttonText }) => {
  const classes = useStyles();

  return (
    <Grid
      container
      item
      justifyContent="center"
      alignItems="center"
      xs={8}
      sm={6}
      className={classes.formWrapper}
    >
      <form onSubmit={handleSubmit}>
        <Grid container alignItems="center" spacing={3}>
          <Typography variant="h5" className={classes.greetings}>
            {greetingsText}
          </Typography>
          {children}
          <Grid container item xs={12} justifyContent="center">
            <CustomButton
              color={'primary'}
              isForm={true}
              buttonText={buttonText}
            />
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
};

export default AuthForm;
