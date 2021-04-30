import React from "react"
import {MenuItem, Select} from "@material-ui/core"
import locales from "../shared/locales/locales"
import localStorageKeys from '../shared/constants/localStorageKeys';

export default function LanguagePicker({selectedLocale, setSelectedLocale}) {
    console.log(selectedLocale)
    return (
        <div>
            <Select
                value={selectedLocale}
                onChange={(e) => {
                    
                    setSelectedLocale(e.target.value)
                    localStorage.setItem(localStorageKeys.LOCALE, e.target.value)
                }}
            >
                <MenuItem value={locales.EN}>English</MenuItem>
                <MenuItem value={locales.RU}>Русский</MenuItem>
            </Select>
        </div>
    )
}