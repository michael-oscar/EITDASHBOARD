import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

// Creates a new Mongo collections and exports it
export const EITDB = new Mongo.Collection('Eits');
//publication
if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('Eits', function tasksPublication() {
    return EITDB.find();
  });
}
 
Meteor.methods({
    'Eitdbcall.insert'(Fullname, Age, Email,Phonenumber, Country) {
      check(Fullname, String);
      check(Age, Number);
      check(Email, String);
      check(Phonenumber, String);
      check(Country, String);

   
      // Make sure the user is logged in before inserting a task
      if (! this.userId) {
        throw new Meteor.Error('not-authorized');
      }
      EITDB.insert(
        {
          Fullname, 
          Age,
          Email,
          Phonenumber,
          Country,
          owner: this.userId,           // _id of logged in user, was Meteor.userId()
          username: Meteor.user.username,
        });
    },

    'Eitdbcall.remove'(id) {
      if (! this.userId) {
        throw new Meteor.Error('not-authorized');
      }

        EITDB.remove(id);

    },


      'Eitdbcall.setChecked'(taskId, setChecked) {
        // check(taskId, String);
        // check(setChecked, Boolean);
     
        EITDB.update(taskId, { $set: { checked: setChecked } });
      },

      'Eitdbcall.update'(taskId, Fullname, Age, Email,Phonenumber, Country) {
        const eit = EITDB.findOne(taskId);
        if (this.userId !== eit.owner) {
          throw new Meteor.Error('not-authorized');
        }
        EITDB.update(taskId, { $set: { Fullname: Fullname, Age: Age, Email: Email, Phonenumber: Phonenumber, Country: Country } });
      },
      
    });
