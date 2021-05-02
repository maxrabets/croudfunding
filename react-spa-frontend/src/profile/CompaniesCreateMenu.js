import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {TextField, Button} from '@material-ui/core';
import {FormattedMessage} from "react-intl"

const CompaniesMenu = () => {
    const { user, isAuthenticated } = useAuth0();  

    if(isAuthenticated) {
        return (
            <>
                <form  noValidate autoComplete="off">
                    <div>
                        <TextField 
                            id="standard-name" 
                            label={<FormattedMessage id="companies.name" />}
                        />
                    </div>
                </form>
                <Button variant="contained" 
                    color="primary" 
                >
                    <FormattedMessage id="companies.create" />
                </Button>
            </>
        );
    }
    return <></>
};

export default CompaniesMenu;
