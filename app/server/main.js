import { Meteor } from 'meteor/meteor';

import '/imports/startup/server/publications.js';

// Methods
//import '/imports/api/projectsMethods.js';
import '/imports/api/photosMethods.js';
import '/imports/api/commentsMethods.js';

Meteor.startup(() => {
  // code to run on server at startup
});
