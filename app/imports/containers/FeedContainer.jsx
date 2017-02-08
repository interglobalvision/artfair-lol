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

  // Set feedTimestamp, used to differentiate new posts when added
  if (!Session.get('feedTimestamp')) {
    Session.set('feedTimestamp', new Date());
  }

  let sort = 'new';

  if (props.hashtag) {
    sort = '#' + props.hashtag;
  }

  if (props.sort) {
    sort = props.sort;
  }

  if (!Session.get('pagination')) {
    Session.set('pagination', 1);
  }

  let subscriptionParams = {
    sort,
    timestamp: Session.get('feedTimestamp'),
    pagination: Session.get('pagination'),
  };

  let subscriptionNewPostsParams = {
    sort,
    timestamp: Session.get('feedTimestamp'),
  };

  if (
    Meteor.subscribe('feed.posts', subscriptionParams).ready() && // Subscription for feed posts
    Meteor.subscribe('feed.newPosts', subscriptionNewPostsParams).ready() // Subscription for new posts
  ) {

    let notifyNewPosts = true;
    let limit = (subscriptionParams.pagination * Meteor.settings.public.postsPerPage);

    let options = {
      sort: {
        createdAt: -1,
      },
      limit,
    };

    let availablePostsOptions = {
      sort: {
        createdAt: -1,
      },
      limit: limit + 1,
    };

    if (props.sort === 'pop') {
      options.sort = {
        ranking: -1,
      }

      availablePostsOptions.sort = {
        ranking: -1,
      }

      notifyNewPosts = false;
    }

    // Posts displayed on the feed
    const posts = Posts.find({
      createdAt: {
        $lte: Session.get('feedTimestamp'),
      },
    }, options).fetch();

    // Check if theres still posts available to retrive
    // This queries for limit + 1 posts, 1 post more than the `post` query
    let availablePosts = Posts.find({
      createdAt: {
        $lte: Session.get('feedTimestamp'),
      },
    }, availablePostsOptions).fetch().length;

    // Check the size of `availablePosts` minus `limit`.
    // If 1 or more, it means theres more posts available to load
    // If 0 or less, it means we have reached the end of the posts
    const morePosts = availablePosts - limit >= 1 ? true : false;

    // Just added posts live update, use for notice
    const newPosts = Posts.find({
      createdAt: {
        $gt: Session.get('feedTimestamp'),
      },
    }).fetch().length;

    onData(null, { posts, newPosts, morePosts, notifyNewPosts });
  };

}

export const FeedContainer = compose(getTrackerLoader(reactiveMapper))(FeedLayout);
