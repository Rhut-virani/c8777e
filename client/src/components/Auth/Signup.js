import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Grid, TextField } from '@material-ui/core';
import AuthForm from './AuthForm';


const Signup = ({ user, register }) => {

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
    <AuthForm handleSubmit={handleRegister} greetingsText={'Create an account.'} buttonText={'Create'}>
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
    </AuthForm>
  );
};

export default Signup;
