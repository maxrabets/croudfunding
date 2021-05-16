import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {AppBar, Toolbar, IconButton, Box, Popover } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SideBar from "./SideBar"
import AuthenticaionPanel from "../shared/components/authenticationPanel/AuthenticationPanel"
import LanguagePicker from '../shared/components/LanguagePicker';
import ThemeSwitch from '../shared/components/ThemeSwitch';
import SearchMenu from '../shared/components/SearchMenu';
import SearchIcon from '@material-ui/icons/Search';

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
  const [searchMenuAnchorEl, setSearchMenuAnchorEl] = useState(null);

  const open = Boolean(searchMenuAnchorEl);

  return (
    <div className={classes.root}>
      <Box>
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
            <IconButton 
              onClick={(event) => setSearchMenuAnchorEl(event.currentTarget)}
            >
              <SearchIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
      <Popover  open={open}
        anchorEl={searchMenuAnchorEl}
        onClose={() => setSearchMenuAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <SearchMenu />
      </Popover> 
      <SideBar open={sideBarOpen} setOpen={setSideBarOpen}></SideBar>
    </div>
  );
}
