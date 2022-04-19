import React from "react";
import { Grid } from "@material-ui/core";
import AuthSidePanel from "./Auth/AuthSidePanel";
import Header from "./Auth/Header";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  wrapper: {
    height: "100vh",
  },
}));

const AuthWrapper = ({ children, isLogin }) => {
  const classes = useStyles();

  return (
    <Grid container spacing={0} className={classes.wrapper}>
      <AuthSidePanel />
      <Grid
        container
        alignItems="flex-start"
        justifyContent="center"
        item
        xs={12}
        md={7}
      >
        <Header
          linkText={isLogin ? 'Create account' : 'Login'}
          link={isLogin ? 'register' : 'login'}
          text={isLogin ? 'Don’t have an account?' : 'Already have an account?'}
        />
        {children}
      </Grid>
    </Grid>
  );
};

export default AuthWrapper;
