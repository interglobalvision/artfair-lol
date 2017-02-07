import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';

import { MainContainer } from '/imports/containers/MainContainer.jsx';
import { PostContainer } from '/imports/containers/PostContainer.jsx';
import { FeedContainer } from '/imports/containers/FeedContainer.jsx';

import { NewPost } from '/imports/components/posts/NewPost.jsx';

// Post Routes
const postsRoutes = FlowRouter.group({
  name: 'posts',
});

postsRoutes.route('/new', {
  name: 'newPost',
  action() {
    Session.set('feedState', 'New')

    mount(MainContainer, {
      content: <NewPost />,
    });
  },
});

postsRoutes.route('/hashtag/:hashtag', {
  name: 'newPost',
  action(params) {
    Session.set('feedState', '#' + params.hashtag)

    mount(MainContainer, {
      content: <FeedContainer hashtag={params.hashtag}/>,
    });
  },
});

postsRoutes.route('/post/:id', {
  name: 'singlePost',
  action(params) {
    Session.set('feedState', 'Post')

    mount(MainContainer, {
      //content: <UserLogin />,
      content: <PostContainer postId={params.id} />,
    });
  },
});
