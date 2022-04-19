import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Grid, TextField } from '@material-ui/core';
import AuthForm from './AuthForm';

const Login = ({ user, login }) => {

  const history = useHistory();

  const handleLogin = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formElements = form.elements;
    const username = formElements.username.value;
    const password = formElements.password.value;

    await login({ username, password });
  };

  useEffect(() => {
    if (user && user.id) history.push('/home');
  }, [user, history]);

  return (
    <AuthForm handleSubmit={handleLogin} greetingsText={'Welcome Back!'}>
      <Grid item xs={12}>
        <TextField
          fullWidth
          margin="normal"
          aria-label="username"
          label="Username"
          name="username"
          type="text"
          required
          autoComplete="username"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          margin="normal"
          label="Password"
          aria-label="password"
          type="password"
          name="password"
          required
          autoComplete="new-password"
        />
      </Grid>
    </AuthForm>
  );
};

export default Login;
