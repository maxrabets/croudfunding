import React from "react"
import {MenuItem, Select} from "@material-ui/core"
import locales from "../locales/locales"
import { useSelector, useDispatch } from 'react-redux';
import {
    setLocale,
    selectLocale,
  } from '../slices/selectedLocaleSlice';

export default function LanguagePicker() {
    const dispatch = useDispatch();
    const selectedLocale = useSelector(selectLocale);

    return (
        <div>
            <Select
                value={selectedLocale}
                onChange={(e) => {
                    dispatch(setLocale(e.target.value))
                }}
            >
                <MenuItem value={locales.EN}>English</MenuItem>
                <MenuItem value={locales.RU}>Русский</MenuItem>
            </Select>
        </div>
    )
}