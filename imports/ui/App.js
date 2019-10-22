import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import ListEIT from './ListEIT.js';
import AddEIT from './AddEIT.js';
import EditEIT from './EditEIT.js';

// createa a REACT component
class App extends Component {
  render() {
    return (
        <Router>
        <header>
          <Link to="/">ListEIT</Link> ||
          <Link to="/eits/add">AddEIT</Link> ||
        </header>
        <Switch>
          <Route exact path="/" component={ListEIT} />
          <Route path="/eits/add" component={AddEIT} />
          <Route path="/eits/:id/edit" component={EditEIT} />
        </Switch>
      </Router>
    );
  }
}


export default App;