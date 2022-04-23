import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import CustomButton from './CustomButton';

const useStyles = makeStyles((theme) => ({
  headerWrapper: {
    padding: '1.875rem 2.625rem 0 0',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'space-evenly',
    },
  },
  headerText: {
    fontSize: '0.875rem',
    margin: '0 1.875rem',
    color: '#B0B0B0',
    [theme.breakpoints.down('sm')]: {
      margin: '0 1rem',
    },
  },
  headerLink: {
    textDecoration: 'none',
  },
}));

const Header = ({ text, linkText, link }) => {
  const classes = useStyles();

  return (
    <Grid
      container
      item
      justifyContent="flex-end"
      alignItems="center"
      className={classes.headerWrapper}
    >
      <Typography className={classes.headerText}>{text}</Typography>
      <Link to={link} className={classes.headerLink}>
        <CustomButton
          color={'secondary'}
          isForm={false}
          buttonText={linkText}
        />
      </Link>
    </Grid>
  );
};

export default Header;
