import { Posts } from '/imports/collections/posts.js';

import sanitizeHtml from 'sanitize-html';

export const addPost = new ValidatedMethod({
  name: 'Posts.methods.add',
  validate: new SimpleSchema({
    photo: {
      type: String
    },
    fingerprint: {
      type: String,
    },
    caption: {
      type: String,
      optional: true,
    },
    comments: {
      type: [String],
    }
  }).validator(),

  run({photo, fingerprint, caption, comments}) {

    let captionSantized = sanitizeHtml(caption);

    Posts.insert({
      photo,
      fingerprint,
      caption: captionSantized,
      comments,
    });
  }
});
