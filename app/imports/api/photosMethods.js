import { Posts } from '/imports/collections/posts.js';

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
  }).validator(),

  run({photo, fingerprint, caption}) {
    Posts.insert({
      photo,
      fingerprint,
      caption,
    });
  }
});
