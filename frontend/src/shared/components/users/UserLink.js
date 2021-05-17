import React from 'react';
import {Link} from 'react-router-dom';
import { Typography, Avatar, Link as MaterialUILink} from '@material-ui/core';

const Comment = ({user}) => {
    return (   
        <MaterialUILink component={Link} to={`/users/${user.user_id}`} color="inherit"> 
            <Avatar alt={user.full_name} src={user.picture}/>  
            <Typography >{user.nickname} </Typography>
        </MaterialUILink>
    );
}

export default Comment;