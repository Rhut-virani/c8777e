import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Grid, Typography, Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CustomButton from './CustomButton';

const useStyles = makeStyles(() => ({
  button: {
    padding: '1rem 3rem',
    marginTop: '2rem',
    boxShadow: '0px 4px 4px rgba(88, 133, 196, 0.15)',
  },
  greetings: {
    fontWeight: 600,
  },
}));

const Signup = ({ user, register }) => {
  const classes = useStyles();

  const history = useHistory();

  const [formErrorMessage, setFormErrorMessage] = useState({});

  const handleRegister = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formElements = form.elements;
    const username = formElements.username.value;
    const email = formElements.email.value;
    const password = formElements.password.value;
    const confirmPassword = formElements.confirmPassword.value;

    if (password !== confirmPassword) {
      setFormErrorMessage({ confirmPassword: 'Passwords must match' });
      return;
    }
    await register({ username, email, password });
  };

  useEffect(() => {
    if (user && user.id) history.push('/home');
  }, [user, history]);

  return (
    <>
      <Grid
        container
        item
        justifyContent="center"
        alignItems="center"
        xs={8}
        sm={6}
      >
        <form onSubmit={handleRegister}>
          <Typography variant="h5" gutterBottom className={classes.greetings}>
            Create an account.
          </Typography>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            spacing={3}
          >
            <Grid item xs={12}>
              <TextField
                fullWidth
                aria-label="username"
                label="Username"
                name="username"
                type="text"
                autoComplete="username"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="E-mail address"
                aria-label="e-mail address"
                type="email"
                name="email"
                required
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                aria-label="password"
                label="Password"
                type="password"
                inputProps={{ minLength: 6 }}
                name="password"
                required
                autoComplete="new-password"
                error={!!formErrorMessage.confirmPassword}
                helperText={formErrorMessage.confirmPassword}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Confirm Password"
                aria-label="confirm password"
                type="password"
                inputProps={{ minLength: 6 }}
                name="confirmPassword"
                required
                autoComplete="new-password"
                error={!!formErrorMessage.confirmPassword}
                helperText={formErrorMessage.confirmPassword}
              />
            </Grid>
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
    </>
  );
};

export default Signup;
