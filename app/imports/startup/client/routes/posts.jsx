import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';

import { MainContainer } from '/imports/containers/MainContainer.jsx';
import { PostContainer } from '/imports/containers/PostContainer.jsx';

import { NewPost } from '/imports/components/posts/NewPost.jsx';

const scrollToTop = () => {
  $('html, body').stop().animate({ scrollTop: 0 }, 300);
};

// Post Routes
const postsRoutes = FlowRouter.group({
  name: 'posts',
});

postsRoutes.route('/new', {
  name: 'newPost',
  triggersEnter: [scrollToTop],
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

postsRoutes.route('/post/:id/:scroll', {
  name: 'singlePostScroll',
  action(params) {
    mount(MainContainer, {
      //content: <UserLogin />,
      content: <PostContainer postId={params.id} scrollTo={params.scroll} />,
    });
  },
});
