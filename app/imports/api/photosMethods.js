import { Posts } from '/imports/collections/posts.js';

export const addPost = new ValidatedMethod({
	name: 'Posts.methods.add',
	validate: new SimpleSchema({
		url: {
			type: SimpleSchema.RegEx.Url,
		},
    caption: {
      type: String,
    },
    userFingerPrint: {
      type: String,
    },
	}).validator(),

	run({url, caption}) {
		Posts.insert({
			name,
			url,
		});
	}
});
