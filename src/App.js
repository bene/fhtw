import React from 'react'
import {BrowserRouter, Switch, Route} from "react-router-dom"

import CreateEvent from "./CreateEvent"
import Overview from "./Overview"
import CreateMessage from "./CreateMessage"

const App = () => {

    return (
        <div className="container">
            <div className="jumbotron my-5 shadow-sm">
                <h1 className="display-4 my-auto ml-5">BWI Übersicht</h1>
            </div>

            <BrowserRouter>
                <Switch>
                    <Route path="/events/add">
                        <CreateEvent />
                    </Route>

                    <Route path="/events/edit/:eventId">
                        <CreateEvent />
                    </Route>

                    <Route path="/messages/add">
                        <CreateMessage />
                    </Route>

                    <Route path="/">
                        <Overview />
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    )
}

export default App
