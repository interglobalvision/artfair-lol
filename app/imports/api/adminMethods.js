import { Posts } from '/imports/collections/posts.js';

export const removePost = new ValidatedMethod({
  name: 'Admin.methods.removePost',
  validate: new SimpleSchema({
    postId: {
      type: String
    },
  }).validator(),

  run({postId}) {
    if (Roles.userIsInRole(Meteor.userId(), 'admin')) {
      Posts.remove(postId);
    } else {
      console.log('fuck out my house');
    }
  }
});
