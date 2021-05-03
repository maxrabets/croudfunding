import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {TextField, Button, Select, 
    Typography, MenuItem, InputLabel, Breadcrumbs} from '@material-ui/core';
import {FormattedMessage} from "react-intl"
import MarkdownEditor from '@uiw/react-markdown-editor';
import Tags from "@yaireo/tagify/dist/react.tagify"
import "@yaireo/tagify/dist/tagify.css"
import {NavLink} from "react-router-dom";


const CompaniesMenu = () => {
    const { user, isAuthenticated } = useAuth0();  

    if(isAuthenticated) {
        return (
        <>
            <Breadcrumbs aria-label="breadcrumb">
                <NavLink color="inherit" to="/profile" >
                    <FormattedMessage id="links.profile" />
                </NavLink>
                <NavLink color="inherit" to="/profile/companies">
                    <FormattedMessage id="links.mycompanies" />
                </NavLink>
                <Typography color="textPrimary">
                    <FormattedMessage id="links.create_company" />
                </Typography>
            </Breadcrumbs>
            <form>
                <div>
                    <TextField 
                        label={<FormattedMessage id="companies.name" />}
                    />
                </div>
                <div>
                    <Select>
                        <InputLabel>
                            <FormattedMessage id="companies.category" />
                        </InputLabel>
                        <MenuItem value={10}>Electronics</MenuItem>
                        <MenuItem value={20}>Cars</MenuItem>
                        <MenuItem value={30}>Education</MenuItem>
                    </Select>
                </div>
                <MarkdownEditor height={100}/>
                <Tags
                    value="a,b,c"
                    onChange={ e => console.log("CHANGED:", JSON.parse(e.detail.value)) }
                />
                <Button 
                    variant="contained" 
                    color="primary" 
                >
                    <FormattedMessage id="companies.create" />
                </Button>
            </ form>
        </>
        );
    }
    return <></>
};

export default CompaniesMenu;
