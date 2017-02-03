import { Meteor } from 'meteor/meteor';

import { compose } from 'react-komposer';

import { Posts } from '/imports/collections/posts.js';

import { PostLayout } from '/imports/components/post/PostLayout.jsx';

function getTrackerLoader(reactiveMapper) {
  return (props, onData, env) => {
    let trackerCleanup = null;
    const handler = Tracker.nonreactive(() => {
      return Tracker.autorun(() => {
        // assign the custom clean-up function.
        trackerCleanup = reactiveMapper(props, onData, env);
      });
    });

    return () => {
      if(typeof trackerCleanup === 'function') trackerCleanup();
      return handler.stop();
    };
  };
}

function reactiveMapper(props, onData) {

  if (Meteor.subscribe('post.single', props.postId).ready()) {
    const post = Posts.findOne(props.postId);
    onData(null, { post });
  };

}

export const PostContainer = compose(getTrackerLoader(reactiveMapper))(PostLayout);
