import { Meteor } from 'meteor/meteor';

import { Posts } from '/imports/collections/posts.js';

Meteor.publish('feed.posts', function(subscriptionParams) {

  check(subscriptionParams, Object);
  check(subscriptionParams.sort, String);
  check(subscriptionParams.timestamp, Date);

  let limit = (subscriptionParams.pagination * Meteor.settings.public.postsPerPage) + 1;

  let query = {
    createdAt: {
      $lte: subscriptionParams.timestamp,
    },
  }

  let options = {
    sort: {
      createdAt: -1,
    },
    limit,
  };

  if (subscriptionParams.sort === 'pop') {
    options.sort = {
      ranking: -1,
    }
  } else if (/([#])/.exec(subscriptionParams.sort)) {
    query.hashtags =  subscriptionParams.sort;
  }

  return Posts.find(query, options);

});

Meteor.publish('feed.newPosts', function(subscriptionParams) {

  check(subscriptionParams, Object);
  check(subscriptionParams.sort, String);
  check(subscriptionParams.timestamp, Date);

  let query = {
    createdAt: {
      $gt: subscriptionParams.timestamp,
    },
  }

  if (/([#])/.exec(subscriptionParams.sort)) {
    query.hashtags =  subscriptionParams.sort;
  }

  return Posts.find(query, {
    sort: {
      createdAt: -1,
    }
  });

});

Meteor.publish('post.single', function(postId) {

  check(postId, String);

  return Posts.find(postId);

});
