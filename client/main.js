import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

import 'bootstrap/dist/css/bootstrap.min.css';

import App from '../imports/ui/App.js';

Meteor.startup(() => {
  ReactDOM.render(<App />, document.getElementById('app'));
});