import { Meteor } from 'meteor/meteor';

import { Posts } from '/imports/collections/posts.js';

Migrations.add({
  version: 1,
  name: 'Update images url to use cloudfront',
  up: function() {
    let oldServer = "https://artfair-lol.s3.amazonaws.com";
    let newServer = Meteor.settings.AWSCdn;

    Posts.find({}).forEach(post => { // Find ALL Posts
      let photo = post.photo.replace(oldServer,newServer);

      Posts.update(post._id, { $set: { photo } });
    });
  },
});

Meteor.startup(function() {
	Migrations.migrateTo('1');
});
