import { Meteor } from 'meteor/meteor';

import { compose } from 'react-komposer';
import Fingerprint2 from 'fingerprintjs2';

import { MainLayout } from '/imports/components/base/MainLayout.jsx';

const composer = (props, onData) => {

  new Fingerprint2().get((fingerprint) => {
    Session.set('fingerprint', fingerprint);
    onData(null, {});
  });

};

export const MainContainer = compose(composer)(MainLayout);
