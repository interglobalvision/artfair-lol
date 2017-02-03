import { Meteor } from 'meteor/meteor';

import { Posts } from '/imports/collections/posts.js';

Meteor.publish('feed.posts', function(subscriptionParams) {

  check(subscriptionParams, Object);
  check(subscriptionParams.sort, String);

  return Posts.find({}, {
    sort: {
      createdAt: -1,
    },
    limit: 10,
  });

});