import { Meteor } from 'meteor/meteor';

import { compose } from 'react-komposer';

import { Posts } from '/imports/collections/posts.js';

import { NewPostsNotice } from '/imports/components/feed/NewPostsNotice.jsx';

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
};

function reactiveMapper(props, onData) {

  let subscriptionParams = {
    timestamp: Session.get('feedTimestamp'),
  };

  if (Meteor.subscribe('feed.newPosts', subscriptionParams).ready()) {
    console.log('retriggering new sub');

    const posts = Posts.find({
      createdAt: {
        $gt: Session.get('feedTimestamp'),
      },
    }).fetch();
    onData(null, { posts });
  };

}

export const NewPostsContainer = compose(getTrackerLoader(reactiveMapper))(NewPostsNotice);
