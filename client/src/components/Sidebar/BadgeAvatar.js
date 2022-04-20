import React from "react";
import { Box, Badge, Avatar } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  profilePic: {
    height: '2.75rem',
    width: '2.75rem',
  },
  badge: {
    height: '.8125rem',
    width: '.8125rem',
    borderRadius: "50%",
    border: "2px solid white",
    backgroundColor: "#D0DAE9",
  },
  online: {
    backgroundColor: "#1CED84",
  },
  sidebar: {
    marginLeft: '1rem',
  },
}));

const UserAvatar = ({ sidebar, username, photoUrl, online }) => {
  const classes = useStyles();

  return (
    <Box className={sidebar ? classes.sidebar : ""}>
      <Badge
        classes={{ badge: `${classes.badge} ${online && classes.online}` }}
        variant="dot"
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        overlap="circular"
      >
        <Avatar alt={username} src={photoUrl} className={classes.profilePic} />
      </Badge>
    </Box>
  );
};

export default UserAvatar;
