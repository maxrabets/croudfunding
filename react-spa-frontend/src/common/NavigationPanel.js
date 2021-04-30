import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SideBar from "../shared/components/SideBar"
import AuthenticaionPanel from "../shared/components/authenticationPanel/AuthenticationPanel"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function NavigationPanel() {
  const classes = useStyles();
  const [sideBarOpen, setSideBarOpen] = useState(false);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton 
          edge="start" className={classes.menuButton} color="inherit" aria-label="menu"
          onClick={()=>setSideBarOpen(true)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Crowdfunding
          </Typography>
          <AuthenticaionPanel />
        </Toolbar>
      </AppBar>
      <SideBar open={sideBarOpen} setOpen={setSideBarOpen}></SideBar>
    </div>
  );
}
