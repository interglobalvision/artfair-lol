import { Meteor } from 'meteor/meteor';

import { compose } from 'react-komposer';

import { MainLayout } from '/imports/components/base/MainLayout.jsx';

const composer = (props, onData) => {

    /*
  let user = Meteor.user() || null;
  Session.set('User',user);

  onData(null, { user });
  */

  onData(null, {});

};

export const MainContainer = compose(composer)(MainLayout);
