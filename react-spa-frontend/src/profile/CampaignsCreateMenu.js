import React, {useState} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {TextField, Button, Select, FormControl, Box,
    Typography, MenuItem, InputLabel, Breadcrumbs} from '@material-ui/core';
import {FormattedMessage} from "react-intl";
import MarkdownEditor from '@uiw/react-markdown-editor';
import Tags from "@yaireo/tagify/dist/react.tagify";
import "@yaireo/tagify/dist/tagify.css";
import {NavLink} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ReactPlayer from 'react-player';
import {useDropzone} from 'react-dropzone';

const useStyles = makeStyles((theme) => ({
    select: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
}));

const CampaignsCreateMenu = () => {
    const { user, isAuthenticated } = useAuth0();
    const classes = useStyles();
    const [endDate, setEndDate] = useState(new Date());
    const {acceptedFiles, getRootProps, getInputProps} = useDropzone();

    const files = acceptedFiles.map(file => (
        <li key={file.path}>
        {file.path} - {file.size} bytes
        </li>
    ));

    if(isAuthenticated) {
        return (
        <>
            <Breadcrumbs aria-label="breadcrumb">
                <NavLink color="inherit" to="/profile" >
                    <FormattedMessage id="links.profile" />
                </NavLink>
                <NavLink color="inherit" to="/profile/campaigns">
                    <FormattedMessage id="links.myCampaigns" />
                </NavLink>
                <Typography color="textPrimary">
                    <FormattedMessage id="links.createCampaign" />
                </Typography>
            </Breadcrumbs>

            <form>
                <Box m={4}>
                    <FormControl >
                        <TextField 
                            label={<FormattedMessage id="campaigns.name" />}
                        />
                    </FormControl >
                </Box>
                <Box m={4}>
                    <FormControl>
                        <InputLabel id="categories-select-label">
                            <FormattedMessage id="campaigns.category" />
                        </InputLabel>
                        <Select 
                            id="categories-select"
                            labelId="categories-select-label"
                            className={classes.select}
                        >
                            <MenuItem value={10}>Electronics</MenuItem>
                            <MenuItem value={20}>Cars</MenuItem>
                            <MenuItem value={30}>Education</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Box m={4}>
                    <InputLabel id="description-label">
                        <FormattedMessage id="campaigns.description" />
                    </InputLabel>
                    <MarkdownEditor height={100}/>
                </ Box>
                <Box  m={4}>
                    <InputLabel id="tags-label">
                        <FormattedMessage id="campaigns.tags" />
                    </InputLabel>
                    <Tags
                        value="a,b,c"
                        onChange={ e => console.log("CHANGED:", JSON.parse(e.detail.value)) }
                    />
                </Box>
                <Box m={4}>
                    <FormControl >
                        <TextField 
                            label={<FormattedMessage id="campaigns.targetAmount" />}
                        />
                    </FormControl >
                </Box>
                <Box m={4}>
                    <InputLabel id="date-label">
                        <FormattedMessage id="campaigns.endDate" />
                    </InputLabel>
                    <DatePicker selected={endDate} onChange={date => setEndDate(date)} />
                </Box>
                <Box m={4}>
                    <InputLabel id="video-label">
                        <FormattedMessage id="campaigns.video" />
                    </InputLabel>
                    <ReactPlayer />
                </Box>
                <Box m={4}>
                    <InputLabel id="images-label">
                        <FormattedMessage id="campaigns.images" />
                    </InputLabel>
                    <section className="container">
                        <div {...getRootProps({className: 'dropzone'})}>
                            <input {...getInputProps()} />
                            <p>Drag 'n' drop some files here, or click to select files</p>
                        </div>
                        <aside>
                            <h4>Files</h4>
                            <ul>{files}</ul>
                        </aside>
                    </section>
                </Box>
                
                <Button 
                    variant="contained" 
                    color="primary" 
                >
                    <FormattedMessage id="campaigns.create" />
                </Button>
            </ form>
        </>
        );
    }
    return <></>
};

export default CampaignsCreateMenu;
