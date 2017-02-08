import { Meteor } from 'meteor/meteor';

import { compose } from 'react-komposer';
import ClientJS from '/imports/lib/client.min.js';

import { MainLayout } from '/imports/components/base/MainLayout.jsx';

const composer = (props, onData) => {

  var client = new ClientJS();

  var fingerprint = client.getFingerprint();

  console.log('fingerprint', fingerprint);

  Session.set('fingerprint', fingerprint);
  onData(null, {});

};

export const MainContainer = compose(composer)(MainLayout);
