import React, { useCallback, useState,  } from "react";
import { DialogContent, Dialog, DialogTitle, DialogActions, Button,
    Typography } from '@material-ui/core';
import { useAuth0 } from "@auth0/auth0-react";
import {FormattedMessage} from "react-intl";
import MoneyField from "../MoneyField";
import AvailableBonusesList from "../bonuses/AvailableBonusesList";
import {createPayment} from "../../apis/paymentsApi";

const PaymentDialog = ({campaign, isOpen, onClose, defaultSum}) => {
    const { isAuthenticated, getAccessTokenSilently } = useAuth0();
    const [money, setMoney] = useState(defaultSum);
    const [availableBonuses, setAvailableBonuses] = useState([]);

    const onChangeMoney = useCallback((newMoney) => {
        setAvailableBonuses(campaign.bonuses.filter(bonus => bonus.price <= newMoney));
        setMoney(newMoney);
    }, [campaign.bonuses])

    const onPay = useCallback(async () => {
        const token = await getAccessTokenSilently();
        createPayment(campaign.id, money, token).then(campaignCurrentMoney => {            
            if(campaignCurrentMoney) {
                onClose(campaignCurrentMoney);
            }
            else
                alert("error");
        })
    }, [campaign.id, getAccessTokenSilently, money, onClose])


    if(!isAuthenticated)
        return <></>

    return (
    <Dialog open={isOpen} onClose={() => onClose()} 
        onEnter={() => {
            setAvailableBonuses(campaign.bonuses.filter(bonus => bonus.price <= defaultSum));
            setMoney(defaultSum);
        }}
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
            <Button onClick={() => onClose()} color="primary">
                <FormattedMessage id="dialog.cancel"/>
            </Button>
            </DialogActions>
    </Dialog>
    );
}

export default PaymentDialog;
