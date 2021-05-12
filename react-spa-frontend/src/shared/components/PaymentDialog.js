import React, { useCallback, useState,  } from "react";
import { DialogContent, Dialog, DialogTitle, DialogActions, Button,
    TextField, Typography } from '@material-ui/core';
import { useAuth0 } from "@auth0/auth0-react";
import {FormattedMessage} from "react-intl";
import MoneyField from "./campaignForm/MoneyField";
import AvailableBonusesList from "./AvailableBonusesList";


const PaymentDialog = ({campaign, isOpen, onClose, defaultSum}) => {
    const { isAuthenticated, getAccessTokenSilently } = useAuth0();
    const [money, setMoney] = useState(defaultSum);
    const [availableBonuses, setAvailableBonuses] = useState([]);

    const onChangeMoney = useCallback((newMoney) => {
        setAvailableBonuses(campaign.bonuses.filter(bonus => bonus.price <= newMoney));
        setMoney(newMoney);
    }, [campaign.bonuses])

    const onPay = useCallback(async (bonus) => {
        const token = await getAccessTokenSilently();
        fetch(`/campaigns/${campaign.id}/payment`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({money})
        }).then(response => {
            console.log(response);
            if(response.ok) {
                onClose();
            }
            else
                alert("error");
        });
    }, [campaign.id, getAccessTokenSilently, money, onClose])


    if(!isAuthenticated)
        return <></>

    return (
    <Dialog open={isOpen} onClose={onClose} 
        onEnter={() => setAvailableBonuses(campaign.bonuses.filter(bonus => 
            bonus.price <= defaultSum)
        )}
    >
        <DialogTitle id="form-dialog-title">
            <FormattedMessage id="campaigns.pay"/>
        </DialogTitle>
        <DialogContent>
            <MoneyField defaultMoney={defaultSum} 
                label={<FormattedMessage id="paymentDialog.paymentSum"/>}
                onSetMoney={onChangeMoney}
            />
            <Typography>
                <FormattedMessage id="paymentDialog.availableBonuses"/>
            </Typography>
            <AvailableBonusesList bonuses={availableBonuses} />
        </DialogContent>
        <DialogActions>
            <Button onClick={onPay} color="primary">
                <FormattedMessage id="campaigns.pay"/>
            </Button>
            <Button onClick={onClose} color="primary">
                <FormattedMessage id="dialog.cancel"/>
            </Button>
            </DialogActions>
    </Dialog>
    );
}

export default PaymentDialog;
