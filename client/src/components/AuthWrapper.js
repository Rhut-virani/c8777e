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
        md={8}
      >
        <Header text={isLogin ? "Register" : "Login"} />
        {children}
      </Grid>
    </Grid>
  );
};

export default AuthWrapper;
