import React from "react"
import {BrowserRouter, Switch, Route} from "react-router-dom"
import Main from "../main/Main"
import About from "../about/About"
import Auth0ProviderWithHistory from "../authentication/Auth0ProviderWithHistory"
import NavigationPanel from "./NavigationPanel"

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Auth0ProviderWithHistory>
                <NavigationPanel/>
                <Switch>
                    <Route path="/about">
                        <About></About>
                    </Route>
                    <Route path="/">
                        <Main/>
                    </Route>
                </Switch>
            </Auth0ProviderWithHistory>            
        </BrowserRouter>
    )
}