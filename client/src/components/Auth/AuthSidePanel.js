import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import bgImg from "../../assets/bg-img.png";
import bubble from "../../assets/bubble.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  bannerWrapper: {
    backgroundImage: `linear-gradient(180deg, rgb(58 141 255 / 85%) 0%, rgb(134 185 255 / 85%) 100%), url(${bgImg})`,
    backgroundSize: "cover",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
      alignItems: "center",
      "@media (orientation: landscape)": {
        display: "none",
      },
    },
  },
  bubbleImg: {
    marginBottom: "3rem",
    width: "10ch", //Half the size of bannertext
    objectFit: "contain",
  },
  bubbleWrapper: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  bannerText: {
    color: "#ffffff",
    fontSize: "1.625rem",
    textAlign: "center",
    width: "20ch",
  },
}));

const LoginSignupSidePanel = () => {
  const classes = useStyles();

  return (
    <Grid container item className={classes.bannerWrapper} xs={12} md={4}>
      <Grid
        container
        item
        xs={4}
        md={12}
        justifyContent="center"
        alignContent="flex-end"
        className={classes.bubbleWrapper}
      >
        <img src={bubble} alt="chat-bubble" className={classes.bubbleImg} />
      </Grid>
      <Grid container item xs={8} md={12} justifyContent="center">
        <Typography className={classes.bannerText}>
          Converse with anyone with any language
        </Typography>
      </Grid>
    </Grid>
  );
};

export default LoginSignupSidePanel;
