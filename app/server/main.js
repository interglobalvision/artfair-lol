import { Meteor } from 'meteor/meteor';

// Libs
import '/imports/startup/slingshot.js';

// Data
import '/imports/startup/server/publications.js';

// Methods
import '/imports/api/photosMethods.js';

Meteor.startup(() => {
  // code to run on server at startup
});
