import { Meteor } from 'meteor/meteor';

import { Posts } from '/imports/collections/posts.js';

Meteor.publish('feed.posts', function(subscriptionParams) {

  check(subscriptionParams, Object);
  check(subscriptionParams.sort, String);
  check(subscriptionParams.timestamp, Date);

  let query = {
    createdAt: {
      $lte: subscriptionParams.timestamp,
    },
  }

  if (/([#])/.exec(subscriptionParams.sort)) {
    query.hashtags =  subscriptionParams.sort;
  }

  return Posts.find(query, {
    sort: {
      createdAt: -1,
    },
    limit: 10,
  });

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
