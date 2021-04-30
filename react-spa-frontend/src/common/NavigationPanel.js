import React, { useState } from 'react';
import {NavLink} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

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
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton 
          edge="start" className={classes.menuButton} color="inherit" aria-label="menu"
          onClick={()=>setDrawerOpen(true)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Crowdfunding
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Drawer open={drawerOpen} onClose={()=>setDrawerOpen(false)}>
        <List component="nav" aria-label="mene items list">
          <ListItem>
            <NavLink to="/"
            exact
            className="nav-link"
            activeClassName="router-link-exact-active">Home</NavLink>
          </ListItem>
          <ListItem>
            <NavLink to="/about"
            exact
            className="nav-link"
            activeClassName="router-link-exact-active">About</NavLink>
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
}
