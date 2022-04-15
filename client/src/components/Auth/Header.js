import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import CustomButton from "./CustomButton";

const useStyles = makeStyles((theme) => ({
  headerWrapper: {
    padding: "0 4rem",
    height: "20%",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "space-evenly",
      padding: "0",
    },
  },
  headerText: {
    margin: "0 4rem",
    [theme.breakpoints.down("sm")]: {
      margin: "0 1rem",
    },
  },
  headerLink: {
    textDecoration: "none",
  },
}));

const Header = ({ text, linkText }) => {
  const classes = useStyles();

  return (
    <>
      <Grid
        container
        item
        justifyContent="flex-end"
        alignItems="center"
        className={classes.headerWrapper}
      >
        <Typography className={classes.headerText}>{text}</Typography>
        <Link to={`/${linkText.toLowerCase()}`} className={classes.headerLink}>
          <CustomButton
            color={"secondary"}
            isForm={false}
            buttonText={linkText}
          />
        </Link>
      </Grid>
    </>
  );
};

export default Header;
