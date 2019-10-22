import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';

import { EITDB } from '../api/db.js';

class ListEIT extends React.Component {

    deleteEIT(id) {
        EITDB.remove(id);
    }

    renderEITs() {
        return this.props.eits.map(eit => (
            <tr key={eit._id}>
                <td>{eit.Fullname}</td>
                <td>{eit.Email}</td>
                <td>{eit.Phonenumber}</td>
                <td>{eit.Country}</td>
                <td>
                    <Link to={`/eits/${eit._id}/edit`}>Edit</Link>
                    <button onClick={() => this.deleteEIT(eit._id)}>Delete</button>
                </td>
            </tr>
        ));
    }

    render() {
        console.log(this.props.eits);
        return (
            <div>
                <h2>List All EITs</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Country</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderEITs()}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default withTracker(() => {
    return {
        eits: EITDB.find({}).fetch()
    }
})(ListEIT);
