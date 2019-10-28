import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import {withTracker} from 'meteor/react-meteor-data';
import {EITDB} from '../api/db.js';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Jumbotron,
  Button,
   } from 'reactstrap';



   import AccountsUIWrapper from './AccountsUIWrapper.js';

import ListEIT from './ListEIT.js';
import AddEIT from './AddEIT.js';
import EditEIT from './EditEIT.js';

// createa a REACT component
class App extends Component {




  render() {
    return (
      
        <Router>
                    <div>
                    <AccountsUIWrapper />
                    
                    
      <Navbar color="light" light expand="md">
        <NavbarBrand ><h1 className="container success " > EIT EXPRESS </h1></NavbarBrand>
                   <Nav className="ml-auto" navbar>
            <NavItem>
              <Link to="/" className="nav-link btn btn-success btn-lg" data-toggle="button" aria-pressed="false" autoComplete="off">ListEIT</Link>
            </NavItem>
            <NavItem>
            <Link to="/eits/add" className="nav-link btn btn-danger btn-lg" data-toggle="button" aria-pressed="false" autoComplete="off">AddEIT</Link>
            </NavItem>
            
            </Nav>
            </Navbar>
              
      
        </div>
        <Switch>
          <Route exact path="/" component={ListEIT} />
          <Route path="/eits/add" component={AddEIT} />
          <Route path="/eits/:id/edit" component={EditEIT} />
        </Switch>
      </Router>
      
    );
  }
}

export default withTracker(() => {
  return {
  }
})(App);

