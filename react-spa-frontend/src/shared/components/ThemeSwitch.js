import React, { useState } from "react"
import {Switch as UISwitch} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import {
    selectTheme,
    setTheme
} from '../slices/themeSlice';

export default function ThemeSwitch() {
    const theme = useSelector(selectTheme);
    const [darkMode, setDarkMode] = useState(theme.palette.type === "light");
    const dispatch = useDispatch();

    function onThemeChange(e) {
        setDarkMode(!darkMode);
        dispatch(setTheme({
            palette: {
                type: darkMode ? "dark" : "light" 
            }
        }))
    }

    return (
        <UISwitch checked={darkMode} onChange={onThemeChange} />
    )
}