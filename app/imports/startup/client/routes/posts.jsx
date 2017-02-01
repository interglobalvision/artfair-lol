import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';

import { MainContainer } from '/imports/containers/MainContainer.jsx';

import { NewPost } from '/imports/components/posts/NewPost.jsx';

// Post Routes
const postsRoutes = FlowRouter.group({
  name: 'posts',
});

postsRoutes.route('/new', {
  name: 'newPost',
  action(params) {
    const photo = params.photo || '';

    mount(MainContainer, {
      //content: <UserLogin />,
      content: <NewPost photo={photo} />,
    });
  },
});

postsRoutes.route('/new/:photo', {
  name: 'newPost',
  action(params) {
    let photo = params.photo || '';

    photo = decodeURIComponent(photo);

    mount(MainContainer, {
      //content: <UserLogin />,
      content: <NewPost photo={photo} />,
    });
  },
});
