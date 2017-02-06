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

    let commentSantized = sanitizeHtml(comment);

    Posts.update({_id: postId}, { $push: { comments: commentSantized } } );
  }
});
