import React from 'react';
import {NavLink} from "react-router-dom";
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import {FormattedMessage} from "react-intl"

export default function SideBar({open, setOpen}){
    return(
        <Drawer open={open} onClose={()=>setOpen(false)}>
        <List component="nav" aria-label="mene items list">
          <ListItem>
            <NavLink to="/"
            exact
            className="nav-link"
            activeClassName="router-link-exact-active">
                <FormattedMessage id="links.main"/>
            </NavLink>
          </ListItem>
          <ListItem>
            <NavLink to="/about"
            exact
            className="nav-link"
            activeClassName="router-link-exact-active">
                <FormattedMessage id="links.about"/>
            </NavLink>
          </ListItem>
        </List>
      </Drawer>
    )
}