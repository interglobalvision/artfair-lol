import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';

// import { PageFrontpage } from '/imports/components/pages/Frontpage.jsx';
// import { Page401 } from '/imports/components/pages/Page401.jsx';
// import { Page404 } from '/imports/components/pages/Page404.jsx';

import { MainContainer } from '/imports/containers/MainContainer.jsx';
import { FeedContainer } from '/imports/containers/FeedContainer.jsx';

const scrollToTop = () => {
  $('html, body').stop().animate({ scrollTop: 0 }, 300);
};

// Public Routes
const publicRoutes = FlowRouter.group({
  name: 'public',
});

publicRoutes.route('/', {
  name: 'home',
  triggersEnter: [scrollToTop],
  action() {
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
  triggersEnter: [scrollToTop],
  action() {
    mount(MainContainer, {
      content: <Page404 />,
    });
  },
});

publicRoutes.route('/unauthorized', {
  name: 'unauthorized',
  triggersEnter: [scrollToTop],
  action() {
    mount(MainContainer, {
      content: <Page401 />,
    });
  },
});
