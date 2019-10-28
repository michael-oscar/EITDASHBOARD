import React, { Component } from 'react';

import { EITDB } from '../api/db.js';
import { Meteor } from 'meteor/meteor';

import {withTracker} from 'meteor/react-meteor-data';


class AddEIT extends Component {


  constructor(props) {
    super(props);
    this.state = {
      Fullname: "",
      Phonenumber: "",
      Email: "",
      Country: "",
      Age: "",

    }
  }
  // when there is a change in the 
  handleChange = (event) => {
    const field = event.target.name;

    this.setState({
      [field]: event.target.value
    })
  }
  // when an entry is submited
  handleSubmit = (event) => {
    event.preventDefault();
    // saves created data files
    const{Fullname,Age,Phonenumber,Email,Country}= this.state;
    Meteor.call('Eitdbcall.insert',Fullname,Number(Age),Email,Phonenumber,Country); 

    // EITDB.insert(
    //   {
    //     Fullname: this.state.Fullname,
    //     Age: this.state.Age,
    //     Email: this.state.Email,
    //     Phonenumber: this.state.Phonenumber,
    //     Country: this.state.Country,
    //     owner: Meteor.userId(),           // _id of logged in user
    //     username: Meteor.user().username,
    //   });



    alert(" your entry has been saved!")


    this.props.history.push('/');

  }
  // this is where the stuffs for output is kept
  render() {
    // console.log(this.props);
    console.log(this.state);
    return (

      <div>
        <div className="text-center">
          <h4>EIT MANAGEMENT APP</h4>
        </div>
        <hr />

        {/* <AccountsUIWrapper /> */}
       

          <div className="jumbotron" style={{ margin: "0 500px" }}>
          {this.props.currentUser ?
            <form onSubmit={this.handleSubmit}>
              
              <div className="form-group">
                <label> Full Name:</label>
                <input
                  type="text"
                  className="form-control"
                  name="Fullname"
                  value={this.state.Fullname}
                  onChange={this.handleChange}
                  placeholder="Enter your First Name"
                  required />
              </div>

              <div className="form-group">
                <label> Age:</label>	<input
                  type="number"
                  className="form-control"
                  name="Age"
                  value={this.state.Age}
                  onChange={this.handleChange}
                  placeholder="Enter Age"
                  required />
              </div>


              <div className="form-group">
                <label> Email Address:</label>	<input
                  type="email"
                  className="form-control"
                  name="Email"
                  value={this.state.Email}
                  onChange={this.handleChange}
                  placeholder="Enter email Address"
                  required />
              </div>

              <div className="form-group">
                <label> Phone Number :</label>	<input
                  type="tel"
                  className="form-control"
                  name="Phonenumber"
                  value={this.state.Phonenumber}
                  onChange={this.handleChange}
                  placeholder="Enter Phone Number"
                  required />
              </div>

              <div className="form-group">
                <label> Country:</label>	<input
                  type="text"
                  className="form-control"
                  name="Country"
                  value={this.state.Country}
                  onChange={this.handleChange}
                  placeholder="Enter country code"
                  required />
              </div>

              <button type="submit" className="btn btn-primary"> Submit</button>
            </form> : " please log in"
          }
          </div>

        
      </div>
        );

    }
  
}

// makes its possible for you to use the current user as a prop i.e this.props.currentUser
export default withTracker(()=>{
  return{
    currentUser:Meteor.user(),
  }
})(AddEIT);

