import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';

// import { PageFrontpage } from '/imports/components/pages/Frontpage.jsx';
// import { Page401 } from '/imports/components/pages/Page401.jsx';
// import { Page404 } from '/imports/components/pages/Page404.jsx';

import { MainContainer } from '/imports/containers/MainContainer.jsx';
import { AdminContainer } from '/imports/containers/AdminContainer.jsx';

const adminRoutes = FlowRouter.group({
  name: 'adminRoutes',
});

adminRoutes.route('/admin', {
  name: 'admin',
  action() {
    if (!Roles.userIsInRole(Meteor.userId(), 'admin')) {
      return FlowRouter.go('/');
    } else {
      mount(MainContainer, {
        content: <AdminContainer />,
      });
    }
  },
});
