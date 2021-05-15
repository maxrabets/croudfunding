import React from 'react';
import {NavLink} from "react-router-dom";
import {Drawer, List, ListItem, Typography, Link as MaterialUILink} from '@material-ui/core';
import {FormattedMessage} from "react-intl"
import links from "../shared/constants/links"

export default function SideBar({open, setOpen}){
    return(
        <Drawer open={open} onClose={()=>setOpen(false)}>
        <List component="nav" aria-label="mene items list">
          {links.map((link) => {
            return (
              <ListItem key={link.path}>
                <MaterialUILink component={NavLink} exact 
                  to={link.path} color="inherit" onClick={()=>setOpen(false)}
                >
                    <Typography>
                      <FormattedMessage id={link.id}/>
                    </Typography>
                </MaterialUILink>
              </ListItem>
            )
          })}          
        </List>
      </Drawer>
    )
}