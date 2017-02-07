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
    location: {
      type: String,
    },
    caption: {
      type: String,
      optional: true,
    },
  }).validator(),

  run({photo, fingerprint, location, caption}) {

    let captionSantized = sanitizeHtml(caption);
    let emptyVotes = [];

    Posts.insert({
      photo,
      fingerprint,
      location,
      caption: captionSantized,
      upVotes: emptyVotes,
      downVotes: emptyVotes,
    });
  }
});
