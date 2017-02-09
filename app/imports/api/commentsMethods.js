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
    const hashtagsArray = _.compact(commentSantized.match(/#\S+/g));
    const hashtagsArrayLower = _.map(hashtagsArray, hashtag => hashtag.toLowerCase());

    let insert = {
      $push: {
        comments: commentSantized
      }
    };

    if (hashtagsArrayLower) {
      const post = Posts.findOne(postId);

      let hashtags = _.union(post.hashtags, hashtagsArrayLower)

      insert.$set = {
        hashtags
      };
    }

    Posts.update({_id: postId}, insert);
  }
});
