import React from "react"
import {MenuItem, Select} from "@material-ui/core"

export default LanguagePicker() {
    return (
        <div>
            <Select
                value={selectedLocale}
                onChange={(e) => {
                    setSelectedLocale(e.target.value)
                    localStorage.setItem(localStorageKeys.LOCALE, e.target.value)
                }}
            >

            </Select>
        </div>
    )
}