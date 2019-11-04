import React, {Component} from 'react';

import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import { EITDB } from '../api/db.js';

class EditEIT extends Component{
    constructor(props){
        super(props);
        this.state = {
            Fullname:"",
            Phonenumber:"",
            Email:"",
            Country:"",
            Age:"",
            
        }

        this.Fullname = React.createRef();
        this.Phonenumber = React.createRef();
        this.Email = React.createRef();
        this.Country = React.createRef();
        this.Age= React.createRef();
    }
    // when there is a change in the 
    handleChange = (event) => {
        const field = event.target.name;

        this.setState({ [field]: event.target.value
        })
    }
    // when an entry is submited
    handleSubmit(event,id) {
        event.preventDefault();
        // updates created data files
        Meteor.call('Eitdbcall.update',id,this.Fullname.value,Number(this.Age.value),this.Email.value,this.Phonenumber.value,this.Country.value);
        // alert(" your entry has been saved!")
        this.props.history.push('/');
        // console.log(this.Fullname.value);
        return false;
    }

    componentWillMount() {
        //console.log(this.props);
    }

// this is where the stuffs for output is kept
    render(){
        const eit = this.props.eit;
        console.log(this.props.id)
        return(
            <div>
                <div className="text-center">
          <h4>EIT MANAGEMENT APP</h4>
        </div>
        <hr />

        <div className="jumbotron" style={{ margin: "0 500px" }}>
        {this.props.currentUser ?
          <form onSubmit={(event) => this.handleSubmit(event,this.props.id)}>

            <div className="form-group">
             <label> Full Name:</label>	
            <input
              type= "text"
              className="form-control"
              name="Fullname"
              defaultValue={eit ? eit.Fullname : ''}
              ref={ref => this.Fullname = ref}
              placeholder="Enter your First Name"
              required/>
            </div>

            
            <div className="form-group">
            <label> Age:</label>	<input
              type= "number"
              className="form-control"
              name="Age"
              defaultValue={eit ? eit.Age : ''}
              ref={ref => this.Age = ref}
          	placeholder="Enter Age"
              required/>
              </div>

            <div className="form-group">
            <label> Email Address:</label>	<input
              type= "email"
              className="form-control"
              name="Email"
              defaultValue={eit ? eit.Email : ''}
              ref={ref => this.Email = ref}
          	placeholder="Enter email Address"
              required/>
              </div>

            <div className="form-group">
              <label> Phone Number :</label>	<input
              type= "tel"
              className="form-control"
              name="Phonenumber"
              defaultValue={eit ? eit.Phonenumber : ''}
              ref={ref => this.Phonenumber = ref}
          	placeholder="Enter Phone number"
              required/>
              </div>

              <div className="form-group">
              <label> Country:</label>	<input
              type= "text"
              className="form-control"
              name="Country"
              defaultValue={eit ? eit.Country : ''}
              ref={ref => this.Country = ref}
          		placeholder="Enter country code"
              required/>
              </div>

              <button type= "submit" className= "btn btn-primary" > Submit</button>
              </form>: " please log in"
          }
              </div>
             </div>

        );

    }
  
}

export default withTracker((props) => {
    // console.log(props.match.params);
    const id = props.match.params.id;
    return {
        eit: EITDB.findOne(id),
        id,
        currentUser: Meteor.user(),
    }
})(EditEIT);