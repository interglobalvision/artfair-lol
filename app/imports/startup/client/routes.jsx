import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';

import '/imports/startup/client/routes/public.jsx';

// Other Routes stuff
FlowRouter.wait();

Tracker.autorun(() => {
  if (Roles.subscription.ready() && !FlowRouter._initialized) {
    FlowRouter.initialize();
  }
});

// Scroll to top on route change
const scrollToTop = () => {
  $('html, body').stop().animate({ scrollTop: 0 }, 300);
};

FlowRouter.triggers.enter([scrollToTop]);

// Not found routes
FlowRouter.notFound = {
  action() {
    return FlowRouter.go('/not-found');
  },
};
