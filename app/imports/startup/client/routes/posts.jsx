import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';

import { MainContainer } from '/imports/containers/MainContainer.jsx';
import { PostContainer } from '/imports/containers/PostContainer.jsx';

import { NewPost } from '/imports/components/posts/NewPost.jsx';

// Post Routes
const postsRoutes = FlowRouter.group({
  name: 'posts',
});

postsRoutes.route('/new', {
  name: 'newPost',
  action() {

    mount(MainContainer, {
      content: <NewPost />,
    });
  },
});

postsRoutes.route('/post/:id', {
  name: 'singlePost',
  action(params) {
    mount(MainContainer, {
      //content: <UserLogin />,
      content: <PostContainer postId={params.id} />,
    });
  },
});
