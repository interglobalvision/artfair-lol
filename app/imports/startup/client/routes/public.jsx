import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';

// import { PageFrontpage } from '/imports/components/pages/Frontpage.jsx';
// import { Page401 } from '/imports/components/pages/Page401.jsx';
// import { Page404 } from '/imports/components/pages/Page404.jsx';

import { MainContainer } from '/imports/containers/MainContainer.jsx';
import { FeedContainer } from '/imports/containers/FeedContainer.jsx';
import { UserLogin } from '/imports/components/user/UserLogin.jsx';

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
      headerLeftLabel: 'new',
      headerNavRoute: '/pop',
    });
  },
});

publicRoutes.route('/login', {
  name: 'login',
  action() {

    if (Roles.userIsInRole(Meteor.userId(), 'admin')) {
      return FlowRouter.go('/admin');
    }

    mount(MainContainer, {
      content: <UserLogin />,
      headerNavRoute: '/',
    });
  },
});

publicRoutes.route('/logout', {
  name: 'logout',
  action() {
    Meteor.logout(() => {
      FlowRouter.go('/login');
    });
  },
});

publicRoutes.route('/not-found', {
  name: 'not-found',
  triggersEnter: [scrollToTop],
  action() {
    mount(MainContainer, {
      content: <Page404 />,
      headerNavRoute: '/',
    });
  },
});

publicRoutes.route('/unauthorized', {
  name: 'unauthorized',
  triggersEnter: [scrollToTop],
  action() {
    mount(MainContainer, {
      content: <Page401 />,
      headerNavRoute: '/pop',
    });
  },
});
