import { Posts } from '/imports/collections/posts.js';

import sanitizeHtml from 'sanitize-html';

export const addComment = new ValidatedMethod({
  name: 'Comments.methods.add',
  validate: new SimpleSchema({
    postId: {
      type: String,
    },
    comment: {
      type: String,
    },
  }).validator(),

  run({postId, comment}) {
    const commentSantized = sanitizeHtml(comment);
    let hashtagsArray = _.compact(commentSantized.match(/#\S+/g));

    hashtagsArray = _.map(hashtagsArray, hashtag => hashtag.toLowerCase());

    let insert = {
      $push: {
        comments: commentSantized
      }
    };

    if (hashtagsArray) {
      const post = Posts.findOne(postId);

      let hashtags = _.union(post.hashtags, hashtagsArray)

      insert.$set = {
        hashtags
      };
    }

    Posts.update({_id: postId}, insert);
  }
});
