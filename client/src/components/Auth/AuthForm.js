import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import CustomButton from './CustomButton';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  greetings: {
    fontWeight: 600,
  },
}));

const AuthForm = ({ children, handleSubmit, greetingsText }) => {
  const classes = useStyles();

  return (
    <Grid
      container
      item
      justifyContent="center"
      alignItems="center"
      xs={8}
      sm={6}
    >
      <form onSubmit={handleSubmit}>
        <Typography variant="h5" gutterBottom className={classes.greetings}>
          {greetingsText}
        </Typography>
        <Grid container justifyContent="center" alignItems="center" spacing={3}>
          {children}
          <Grid container item xs={12} justifyContent="center">
            <CustomButton
              color={'primary'}
              isForm={true}
              buttonText={'Create'}
            />
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
};

export default AuthForm;
