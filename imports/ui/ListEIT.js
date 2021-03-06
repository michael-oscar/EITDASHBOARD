import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

  


import { EITDB } from '../api/db.js';

class ListEIT extends React.Component {

      

    toggleChecked(id, checked) {
        // Set the checked property to the opposite of its current value
        // EITDB.update(id, {
        //   $set: { checked: checked },
        // });

        Meteor.call('Eitdbcall.setChecked', id, checked);
      }

      deletedSelected(){
          const checkedEits = EITDB.find({ checked: true }).fetch();
          checkedEits.map(eit => Meteor.call('Eitdbcall.remove', eit._id));

          
         
      }

    deleteEIT(id) {
        // EITDB.remove(id);

        Meteor.call('Eitdbcall.remove', id);
    }

    renderEITs() {
          // Give tasks a different className when they are checked off,
    // so that we can style them nicely in CSS
    
    // const checkedClassName = eit.checked ? 'checked' : '';
    return this.props.eits.map(eit => (
            <tr key={eit._id}>
         <li>
             <input
          type="checkbox"
          readOnly
          checked={eit.checked}
          onClick={(e) => this.toggleChecked(eit._id, e.target.checked)}

        />
        </li>
          
                <td>{eit.Fullname}</td>
                <td>{eit.Age}</td>
                <td>{eit.Email}</td>
                <td>{eit.Phonenumber}</td>
                <td>{eit.Country}</td>
                
                <td>
                   <button > <Link to={`/eits/${eit._id}/edit`}>Edit</Link> </button>
                    <button color="primary" onClick={() => this.deleteEIT(eit._id) } ><span className="glyphicon glyphicon-trash"></span> Delete </button> 
                </td>
            </tr>
        ));
    }

    render() {     

        return (
            <div>
                <div><h4><center> EIT DIRECTORY BOARD </center></h4></div>
                
                <table className="table table-striped">
                    <thead className="thead-dark">
                        <tr>
                        <th scope="col">      </th>
                            <th scope="col">Full Name</th>
                            <th scope="col">Age</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone Number</th>
                            <th scope="col">Country</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderEITs()}
                    </tbody>
                
                
                    
                    
                </table>
                <div className="float-right mr-5" > <button className="btn btn-warning btn-lg btn-block" data-toggle="button" aria-pressed="false" autoComplete="off" onClick={() => this.deletedSelected()}  > Bulk Delete </button> </div>
            </div>
        );
    }
}

export default withTracker(() => {
    Meteor.subscribe('Eits');
    return {
        eits: EITDB.find({}).fetch(),
        currentUser: Meteor.user(),
    }
})(ListEIT);
