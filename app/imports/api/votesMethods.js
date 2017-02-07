import { Posts } from '/imports/collections/posts.js';

export const doVote = new ValidatedMethod({
  name: 'Votes.methods.vote',
  validate: new SimpleSchema({
    postId: {
      type: String,
    },
    fingerprint: {
      type: String,
    },
    voteValue: {
      type: String,
    },
    upVotes: {
      type: [String],
    },
    downVotes: {
      type: [String],
    },
  }).validator(),

  run({postId, fingerprint, voteValue, upVotes, downVotes}) {
    const upVoted = upVotes.indexOf( fingerprint ) > -1 ? true : false;
    const downVoted = downVotes.indexOf( fingerprint ) > -1 ? true : false;

    if (upVoted) {
      Posts.update({_id: postId}, { $pull: { upVotes: fingerprint } } );

      if (voteValue === 'down') {
        Posts.update({_id: postId}, { $push: { downVotes: fingerprint } } );
      }
    } else if (downVoted){
      Posts.update({_id: postId}, { $pull: { downVotes: fingerprint } } );

      if (voteValue === 'up') {
        Posts.update({_id: postId}, { $push: { upVotes: fingerprint } } );
      }
    } else {
      if (voteValue === 'up') {
        Posts.update({_id: postId}, { $push: { upVotes: fingerprint } } );
      } else if (voteValue === 'down') {
        Posts.update({_id: postId}, { $push: { downVotes: fingerprint } } );
      }
    }
  }
});
