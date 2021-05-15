import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {AppBar, Toolbar, IconButton} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SideBar from "./SideBar"
import AuthenticaionPanel from "../shared/components/authenticationPanel/AuthenticationPanel"
import LanguagePicker from '../shared/components/LanguagePicker';
import ThemeSwitch from '../shared/components/ThemeSwitch';

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
            edge="start" className={classes.menuButton} 
            color="inherit" aria-label="menu"
            onClick={()=>setSideBarOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <LanguagePicker />
          <ThemeSwitch />
          <AuthenticaionPanel />
        </Toolbar>
      </AppBar>
      <SideBar open={sideBarOpen} setOpen={setSideBarOpen}></SideBar>
    </div>
  );
}
