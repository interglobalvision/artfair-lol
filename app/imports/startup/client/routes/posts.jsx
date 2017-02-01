import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';

import { MainContainer } from '/imports/containers/MainContainer.jsx';

// Post Routes
const postsRoutes = FlowRouter.group({
  name: 'posts',
});

postsRoutes.route('/new', {
  name: 'newPost',
  action() {
    mount(MainContainer, {
      //content: <UserLogin />,
      content: 'Hello World New',
    });
  },
});
