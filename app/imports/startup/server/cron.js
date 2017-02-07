import { Meteor } from 'meteor/meteor';

import { Posts } from '/imports/collections/posts.js';


SyncedCron.add({
  name: 'Set rankings',
  schedule: function(parser) {
    return parser.text(Meteor.settings.public.ranking.interval);
  },
  job: function() {

    console.log('cronny');

    let timeLimit = moment().subtract(Meteor.settings.public.ranking.hoursLimit , 'hours');

    console.log('timeLimit', timeLimit.calendar());

    let posts = Posts.find({
      createdAt: {
        $gt: timeLimit.toDate(),
      },
    }, {
      sort: {
        createdAt: -1,
      },
    });

    const now = moment();

    posts.forEach(function(post) {

      const likes = post.upVotes.length - post.downVotes.length;

      console.log('likes', likes);

      const created = moment(post.createdAt);

      const hoursSinceCreated = now.diff(created, 'hours');

      console.log('hoursSinceCreated', hoursSinceCreated);

      let commentCount = 0;

      if (post.comments) {
        commentCount = post.comments.length;
      }

      console.log('commentCount', commentCount);

      const timeRank = Math.pow((hoursSinceCreated + 2), Meteor.settings.public.ranking.timeGravity);

      console.log('timeRank', timeRank);

      const commentRank = Math.pow((commentCount + 1), Meteor.settings.public.ranking.commentGravity);

      console.log('commentRank', commentRank);

      const ranking = ( (likes + 1) * Meteor.settings.public.ranking.likesGravity ) + timeRank + commentRank;

      console.log('ranking idea', ranking);

//       console.log(post);

    });

    return true;
  }
});