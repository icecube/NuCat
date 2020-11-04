import React, { useState } from "react"
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { NavBar } from '../components'
import { EventsList, EventsInsert, EventsUpdate } from '../pages'

// import Header from "./Header"
// import Footer from "./Footer"
// import MainDataTable from "./MainDataTable";

import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
    return (
        <Router>
            <NavBar />
            <Switch>
                <Route path="/events/list" exact component={EventsList} />
                <Route path="/events/create" exact component={EventsInsert} />
                <Route
                    path="/events/update/:id"
                    exact
                    component={EventsUpdate}
                />
            </Switch>
        </Router>
    )
};


export default App