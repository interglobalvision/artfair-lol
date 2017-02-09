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
    let emptyVotes = [];

    let data = {
      photo,
      fingerprint,
      location,
      upVotes: emptyVotes,
      downVotes: emptyVotes,
    }

    // If caption is present sanitize it and parse for hashtags
    if (caption !== undefined) {

      // Sanitize caption
      let sanitizedCaption = sanitizeHtml(caption);

      // Add to `data`
      data.caption = sanitizedCaption;

      // Parse hastags
      const hashtagsArray = _.compact(sanitizedCaption.match(/#\S+/g));

      // lowercase the hastags
      hashtagsArrayLower = _.map(hashtagsArray, hashtag => hashtag.toLowerCase());

      // add hashtags to data
      if (hashtagsArrayLower) {
        data.hashtags = hashtagsArrayLower;
      }

    }

    Posts.insert(data);
  }
});
