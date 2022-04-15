import React from "react";
import { Grid, Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

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
  headerButton: {
    padding: "1rem 3rem",
    boxShadow: "0px 4px 4px rgba(88, 133, 196, 0.15)",
    "&:hover": {
      backgroundColor: "#ffffff",
    },
    [theme.breakpoints.down("sm")]: {
      padding: "0.5rem 1rem",
    },
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
          <Button
            color="secondary"
            variant="contained"
            size="large"
            className={classes.headerButton}
          >
            {linkText}
          </Button>
        </Link>
      </Grid>
    </>
  );
};

export default Header;
