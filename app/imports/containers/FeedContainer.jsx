import { Meteor } from 'meteor/meteor';

import { compose } from 'react-komposer';

import { Posts } from '/imports/collections/posts.js';

import { FeedLayout } from '/imports/components/feed/FeedLayout.jsx';

function getTrackerLoader(reactiveMapper) {
  return (props, onData, env) => {
    let trackerCleanup = null;
    const handler = Tracker.nonreactive(() => {
      return Tracker.autorun(() => {
        // assign the custom clean-up function.
        trackerCleanup = reactiveMapper(props, onData, env);
      });
    });

    return () => {
      if(typeof trackerCleanup === 'function') trackerCleanup();
      return handler.stop();
    };
  };
};

function reactiveMapper(props, onData) {

  if (!Session.get('feedTimestamp')) {
    Session.set('feedTimestamp', new Date());
  }

  let subscriptionParams = {
    sort: 'new',
    timestamp: Session.get('feedTimestamp'),
  };

  let subscriptionNewPostsParams = {
    timestamp: Session.get('feedTimestamp'),
  };

  if (Meteor.subscribe('feed.posts', subscriptionParams).ready() && Meteor.subscribe('feed.newPosts', subscriptionNewPostsParams).ready()) {
    console.log('retriggering feed sub');

    const posts = Posts.find({
      createdAt: {
        $lte: Session.get('feedTimestamp'),
      },
    }, {
      sort: {
        createdAt: -1,
      },
    }).fetch();

    const newPosts = Posts.find({
      createdAt: {
        $gt: Session.get('feedTimestamp'),
      },
    }).fetch().length;

    onData(null, { posts, newPosts });
  };

}

export const FeedContainer = compose(getTrackerLoader(reactiveMapper))(FeedLayout);
