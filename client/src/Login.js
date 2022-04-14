import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Grid, Typography, Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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
const Login = ({ user, login }) => {
  const classes = useStyles();

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
    <>
      <Grid
        container
        item
        justifyContent="center"
        alignItems="center"
        xs={8}
        sm={6}
      >
        <form onSubmit={handleLogin}>
          <Typography variant="h5" gutterBottom className={classes.greetings}>
            Welcome Back!
          </Typography>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            spacing={4}
          >
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
            <Grid container item xs={12} justifyContent="center">
              <Button
                color="primary"
                type="submit"
                variant="contained"
                size="large"
                className={classes.button}
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </>
  );
};

export default Login;
