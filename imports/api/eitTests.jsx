import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert } from 'chai';
import { Accounts } from 'meteor/accounts-base';

import {EITDB} from './db.js';
import { func } from 'prop-types';

if (Meteor.isServer) {
    describe('EITAPP', () => {
      describe('methods', () => {

        // create random test user id 
        const tUser= Random.id();

        // create an empty variable for eits
        let  eitdb;

        // create a before block to run each time the code is launched
        before(() =>{
            //create a userId for the test process
            Meteor.users.remove({});
            Accounts.createUser({username: 'Michael', email: 'oscarone@gmail.com', password : '05c4r4t3ch'});
            newUserId= Meteor.users.findOne({username:'Michael'});


        });


        //create a before each block to run before each IT functions is executed
        beforeEach(() =>{
            // clear ndatabase evertime before a  ITfunction runs
            EITDB.remove({});
            //add a new entry to the database  everytime the IT function is about to be executed
            eitdb =EITDB.insert({
                Fullname: " Jakub bryce",
                Age: " 36",
                Email: "jakub@bryce.com",
                Phonenumber: "057893455",
                Country: "GHA",
                owner: tUser,
                username: 'oscar ',
                // this block adds a new data entry using the random user id
     
            });
        });

        // begin test case mapping
        //can view tasks
        it('can view task ', ()=>{
            const tUser = Random.id();
            EITDB.insert({
                Fullname: 'Alfred',
                Age:'23',
                Email: 'alfred@gmail.com',
                Phonenumber: 'o54805733',
                Country: 'GHA',
                owner: newUserId,
                username: 'Michael',

        });
        const invocation={userId: newUserId};
        const eitPublication =Meteor.server.publish_handlers['Eits'];

        assert.strictEqual(eitPublication.apply(invocation).count(),2)

        })

                 //insert
      it('can insert EIT', () => {
        const Fullname = 'Lawrence';
        const Age = '21';
        const Email= 'oscar@gmul.com';
        const Phonenumber = '0804353567';
        const Country = 'Nigeria';
        const owner = newUserId;
        const username =  'Michael';
                       

        const insert = Meteor.server.method_handlers['Eitdbcall.insert'];
        const invocation = {userId:newUserId};
        insert.apply(invocation, [Fullname,Number(Age),Email, Phonenumber,Country]);
        assert.equal(EITDB.find().count(), 2);
  });



              // cannot add if not loggedin
        it('cannot add EIT', function() {
          const Fullname = 'Lawrence';
          const Age = '21';
          const Email='job@jj.com';
          const Phonenumber = '0804353567';
          const Country = 'Nigeria';
          const insert = Meteor.server.method_handlers['Eitdbcall.insert'];
          const invocation = { tUser };
          assert.throws(function() {
              insert.apply(invocation, [Fullname,Number(Age),Email,Phonenumber,Country,]);
            }, Meteor.Error, '[not-authorized]');
          
          assert.equal(EITDB.find().count(), 1);
          });

          //Cannot delete
      it ('can delete own EIT', () => {
        // Find the internal implementation of the task method so we can
       // test it in isolation
       const deleteTask = Meteor.server.method_handlers['Eitdbcall.remove'];
       const invocation = { userId: newUserId };
       deleteTask.apply(invocation, [eitdb]);
       assert.equal(EITDB.find().count(), 0);
      });

      it("cannot delete someone else's EIT", () =>{
        //Set task to Private
        EITDB.update(eitdb, {$set: { private: true} })

        //Generate a random ID, representing a different users
        const tUser = Random.id()

        const deleteTask = Meteor.server.method_handlers['Eitdbcall.remove']
        const invocation = {tUser}
        assert.throws(() => deleteTask.apply(invocation, [eitdb]),
          Meteor.Error, "[not-authorized]")
        assert.strictEqual(EITDB.find().count(), 1)
      })

      it ('cannot delete EIT if not logged in', () => {
        // Find the internal implementation of the task method so we can
       // test it in isolation
       const deleteTask = Meteor.server.method_handlers['Eitdbcall.remove'];
       const invocation = {};
       assert.throws(function(){
        deleteTask.apply(invocation,[eitdb]);
        }, Meteor.Error, '[not-authorized]');
        assert.equal(EITDB.find().count(), 1); // count is one because on start,
        //a data entry is added and is not deleted
      });


        //Edit
      it ('can edit EIT', () => {
        const Fullname = 'Lawna';
        const Age = 25;
        const Email = 'osaka@gmail.com';
        const Phonenumber = 08043453567;
        const Country = 'Liberia';
        const owner = tUser;
        const update = Meteor.server.method_handlers['Eitdbcall.update'];
        const invocation = { userId: tUser };
        update.apply(invocation, [eitdb, Fullname, Age,Email,Phonenumber, Country]);
        assert.equal(EITDB.find().count(), 1);
      })

      it ('cannot edit EIT if not logged in', () => {
        const Fullname = 'Lawna';
        const Age = 25;
        const Email = 'odfd@SpeechGrammarList.com';
        const Phonenumber = 08043453567;
        const Country = 'Liberia';
        const owner= newUserId;
        
        const update = Meteor.server.method_handlers['Eitdbcall.update'];
        const invocation = {};
        assert.throws(function() { 
          update.apply(invocation,[eitdb,Fullname, Age,Email,Phonenumber, Country])},
          Meteor.Error, '[not-authorized]')
        assert.equal(EITDB.find().count(), 1);
      })

      it ("cannot edit someone else's EIT", () => {

        EITDB.update(eitdb, {$set: { private: true} })

        //Generate a random ID, representing a different users
        const tUser = Random.id()

        const Fullname = 'Lawna';
        const Age = 25;
        const Email= 'kk@SpeechGrammarList.com';
        const Phonenumber = 08043453567;
        const Country = 'Liberia';
        const owner = newUserId;
        const update = Meteor.server.method_handlers['Eitdbcall.update'];
        const invocation = {userId: tUser};
        assert.throws(function() {update.apply(invocation, [eitdb,Fullname, Age,Email,Phonenumber, Country]);},
          Meteor.Error, "[not-authorized]")
        assert.equal(EITDB.find().count(), 1);
      })




    //     it('can delete owned task', () => {

    //     });
      });
    });
  }