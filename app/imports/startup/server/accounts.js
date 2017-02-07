import { Meteor } from 'meteor/meteor';

import { AccountsCommon } from 'meteor/accounts-base';
import { AccountsServer } from 'meteor/accounts-base';

// Creating super admin on application creation

Meteor.startup(() => {

  if (!Accounts.findUserByEmail(Meteor.settings.adminEmail)) {

    Accounts.createUser({
      email: Meteor.settings.adminEmail,
      password: Meteor.settings.adminPassword,
    });

    let adminUser = Accounts.findUserByEmail(Meteor.settings.adminEmail);

    Roles.addUsersToRoles(adminUser._id, 'admin');

  }

});
