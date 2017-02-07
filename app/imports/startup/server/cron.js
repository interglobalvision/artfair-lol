import { Meteor } from 'meteor/meteor';

import { Posts } from '/imports/collections/posts.js';


SyncedCron.add({
  name: 'Set rankings',
  schedule: function(parser) {
    return parser.text(Meteor.settings.public.ranking.interval);
  },
  job: function() {
    const now = moment();
    const timeLimit = now.subtract(Meteor.settings.public.ranking.hoursLimit , 'hours');
    const posts = Posts.find({
      createdAt: {
        $gt: timeLimit.toDate(),
      },
    }, {
      sort: {
        createdAt: -1,
      },
    });

    posts.forEach(function(post) {

      const likes = post.upVotes.length - post.downVotes.length;

      const likeRank = (likes + 1) * Meteor.settings.public.ranking.likesGravity;

      const created = moment(post.createdAt);

      const sinceCreated = created.diff(now);

      let commentCount = 0;

      if (post.comments) {
        commentCount = post.comments.length;
      }

      const timeRank = Math.pow(((sinceCreated / 1000) / 60), Meteor.settings.public.ranking.timeGravity);

      const commentRank = Math.pow((commentCount + 1), Meteor.settings.public.ranking.commentGravity);

      const ranking = likeRank + timeRank + commentRank;

      Posts.update(post._id, {$set: {ranking}});

    });

    return true;
  }
});