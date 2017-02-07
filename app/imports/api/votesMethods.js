import { Posts } from '/imports/collections/posts.js';

export const doVote = new ValidatedMethod({
  name: 'Votes.methods.vote',
  validate: new SimpleSchema({
    postId: {
      type: String,
    },
    voteValue: {
      type: String,
    },
  }).validator(),

  run({postId, voteValue}) {
    console.log(voteValue);
  }
});
