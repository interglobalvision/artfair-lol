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

    let hashtagsArrayLower;

    if (caption !== undefined) {

      // Sanitize caption
      caption = sanitizeHtml(caption);

      // Parse hastags
      const hashtagsArray = caption.match(/#\S+/g);
      hashtagsArrayLower = _.map(hashtagsArray, function(hashtag){ return hashtag.toLowerCase(); });
    }

    let emptyVotes = [];

    let data = {
      photo,
      fingerprint,
      location,
      caption,
      upVotes: emptyVotes,
      downVotes: emptyVotes,
    }

    if (hashtagsArrayLower) {
      data.hashtags = hashtagsArrayLower;
    }

    Posts.insert(data);
  }
});
