import React from 'react';
import {NavLink} from "react-router-dom";
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import {FormattedMessage} from "react-intl"
import links from "../constants/links"

export default function SideBar({open, setOpen}){
    return(
        <Drawer open={open} onClose={()=>setOpen(false)}>
        <List component="nav" aria-label="mene items list">
          {links.map((link) => {
            return (
              <ListItem key={link.path}>
                <NavLink to={link.path}
                  exact
                  className="nav-link"
                  activeClassName="router-link-exact-active"
                  onClick={()=>setOpen(false)}
                >
                    <Typography color="primary">
                      <FormattedMessage id={link.id}/>
                    </Typography>                
                </NavLink>
              </ListItem>
            )
          })}          
        </List>
      </Drawer>
    )
}