import React, { Component } from 'react';
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



import ListEIT from './ListEIT.js';
import AddEIT from './AddEIT.js';
import EditEIT from './EditEIT.js';

// createa a REACT component
class App extends Component {
  render() {
    return (
        <Router>
                    <div>
                    
      <Navbar color="light" light expand="md">
        <NavbarBrand ><h1 className="container success " > EIT EXPRESS </h1></NavbarBrand>
                   <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink> <Link to="/" className="nav-link" class="btn btn-success btn-lg" data-toggle="button" aria-pressed="false" autocomplete="off">ListEIT</Link> ||</NavLink>
            </NavItem>
            <NavItem>
              <NavLink> <Link to="/eits/add" className="nav-link" class="btn btn-danger btn-lg" data-toggle="button" aria-pressed="false" autocomplete="off">AddEIT</Link> ||</NavLink>
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


export default App;