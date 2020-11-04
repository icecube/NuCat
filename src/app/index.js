import React, { useState } from "react"
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { NavBar, Footer } from '../components'
import { EventsList, EventsInsert, EventsUpdate, About, EventInfo } from '../pages'

import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
    // https://medium.com/swlh/how-to-create-your-first-mern-mongodb-express-js-react-js-and-node-js-stack-7e8b20463e66
    return (
        <Router>
            <NavBar />
            <Switch>
                <Route path="/" exact component={EventsList} />
                <Route path="/events/create" exact component={EventsInsert} />
                <Route
                    // path="/events/update/:id"
                    path="/events/update/"
                    exact
                    component={EventsUpdate}
                />
                <Route path="/about" exact component={About} />
                <Route path="/event/:id" component={EventInfo} />
            </Switch>
        </Router>
    )
};


export default App