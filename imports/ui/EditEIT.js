import React, {Component} from 'react';

import { withTracker } from 'meteor/react-meteor-data';

import { EITDB } from '../api/db.js';

class EditEIT extends Component{
    constructor(props){
        super(props);
        this.state = {
            Fullname:"",
            Phonenumber:"",
            Email:"",
            Country:"",
            
        }
    }
    // when there is a change in the 
    handleChange = (event) => {
        const field = event.target.name;

        this.setState({ [field]: event.target.value
        })
    }
    // when an entry is submited
    handleSubmit =(event) => {
        event.preventDefault();
        // saves created data files
        EITDB.insert(this.state);
        // alert(" your entry has been saved!")
        this.props.history.push('/');

    }

    componentWillMount() {
        console.log(this.props);
    }

// this is where the stuffs for output is kept
    render(){
        console.log(this.state);
        return(
            <div>
                <div className="text-center">
          <h4>EIT MANAGEMENT APP</h4>
        </div>
        <hr />

        <div className="jumbotron" style={{ margin: "0 500px" }}>
          <form onSubmit={this.handleSubmit}>

            <div className="form-group">
             <label> Full Name:</label>	
            <input
              type= "text"
              className="form-control"
              name="Fullname"
              value={this.state.Fullname}
              onChange={this.handleChange}
            placeholder="Enter your First Name"
              required/>
            </div>

            <div className="form-group">
            <label> Email Address:</label>	<input
              type= "email"
              className="form-control"
              name="Email"
              value={this.state.Email}
              onChange={this.handleChange}
          	placeholder="Enter email Address"
              required/>
              </div>

            <div className="form-group">
              <label> Phone Number :</label>	<input
              type= "tel"
              className="form-control"
              name="Phonenumber"
              value={this.state.Phonenumber}
              onChange={this.handleChange}
          	placeholder="Enter full name"
              required/>
              </div>

              <div className="form-group">
              <label> Country:</label>	<input
              type= "text"
              className="form-control"
              name="Country"
              value={this.state.Country}
              onChange={this.handleChange}
          		placeholder="Enter country code"
              required/>
              </div>

              <button type= "submit" className= "btn btn-primary"> Submit</button>
              </form>
              </div>
             </div>

        );

    }
  
}

export default withTracker((props) => {
    // console.log(props.match.params);
    const id = props.match.params.id;
    return {
        eit: EITDB.findOne(id)
    }
})(EditEIT);