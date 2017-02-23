import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router-ssr';
import { mount } from 'react-mounter';

import { MainContainer } from '/imports/containers/MainContainer.jsx';
import { PostContainer } from '/imports/containers/PostContainer.jsx';
import { FeedContainer } from '/imports/containers/FeedContainer.jsx';

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
    if (!Session.get('newPhoto') || Meteor.settings.public.disablePosting) {
      return FlowRouter.go('/');
    }

    mount(MainContainer, {
      content: <NewPost />,
      headerNavRoute: '/',
      hideHeaderCamera: true,
    });
  },
});

postsRoutes.route('/pop', {
  name: 'pop',
  triggersEnter: [scrollToTop],
  action() {
    mount(MainContainer, {
      content: <FeedContainer sort={'pop'}/>,
      headerLeftLabel: 'pop',
      headerNavRoute: '/',
    });
  },
});

postsRoutes.route('/hashtag/:hashtag', {
  name: 'hashtag',
  triggersEnter: [scrollToTop],
  action(params) {
    const hashtagLower = params.hashtag.toLowerCase();
    mount(MainContainer, {
      content: <FeedContainer hashtag={hashtagLower}/>,
      headerHashtag: hashtagLower,
      headerNavRoute: '/',
    });
  },
});

postsRoutes.route('/post/:id', {
  name: 'singlePost',
  triggersEnter: [scrollToTop],
  action(params) {
    mount(MainContainer, {
      content: <PostContainer postId={params.id} />,
      headerNavRoute: '/',
    });
  },
});

postsRoutes.route('/post/:id/:scroll', {
  name: 'singlePostScroll',
  action(params) {
    mount(MainContainer, {
      content: <PostContainer postId={params.id} scrollTo={params.scroll} />,
      headerNavRoute: '/',
    });
  },
});
