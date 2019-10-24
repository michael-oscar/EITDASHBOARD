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

        this.Fullname = React.createRef();
        this.Phonenumber = React.createRef();
        this.Email = React.createRef();
        this.Country = React.createRef();
    }
    // when there is a change in the 
    handleChange = (event) => {
        const field = event.target.name;

        this.setState({ [field]: event.target.value
        })
    }
    // when an entry is submited
    handleSubmit(id) {
        event.preventDefault();
        // updates created data files
        EITDB.update(id, {
            $set: {
                Fullname: this.Fullname.value,
                Phonenumber: this.Phonenumber.value,
                Email: this.Email.value,
                Country: this.Country.value,
            }
        })
        // alert(" your entry has been saved!")
        this.props.history.push('/');
        // console.log(this.Fullname.value);

    }

    componentWillMount() {
        console.log(this.props);
    }

// this is where the stuffs for output is kept
    render(){
        // console.log(this.state);

        const eit = this.props.eit;
        return(
            <div>
                <div className="text-center">
          <h4>EIT MANAGEMENT APP</h4>
        </div>
        <hr />

        <div className="jumbotron" style={{ margin: "0 500px" }}>
          <form onSubmit={() => this.handleSubmit(eit._id)}>

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
          	placeholder="Enter full name"
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