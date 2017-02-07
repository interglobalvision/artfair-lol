import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';

// import { PageFrontpage } from '/imports/components/pages/Frontpage.jsx';
// import { Page401 } from '/imports/components/pages/Page401.jsx';
// import { Page404 } from '/imports/components/pages/Page404.jsx';

import { MainContainer } from '/imports/containers/MainContainer.jsx';
import { FeedContainer } from '/imports/containers/FeedContainer.jsx';

// Public Routes
const publicRoutes = FlowRouter.group({
  name: 'public',
});

publicRoutes.route('/', {
  name: 'home',
  action() {
    Session.set('feedState', 'New')

    mount(MainContainer, {
      //content: <UserLogin />,
      content: <FeedContainer />,
    });
  },
});

/*
publicRoutes.route('/logout', {
  name: 'logout',
  action() {
    Meteor.logout(() => {
      FlowRouter.go('/');
    });
  },
});
*/

publicRoutes.route('/not-found', {
  name: 'not-found',
  action() {
    Session.set('feedState', '404')

    mount(MainContainer, {
      content: <Page404 />,
    });
  },
});

publicRoutes.route('/unauthorized', {
  name: 'unauthorized',
  action() {
    Session.set('feedState', '501')

    mount(MainContainer, {
      content: <Page401 />,
    });
  },
});
