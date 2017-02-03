import { Meteor } from 'meteor/meteor';

import { compose } from 'react-komposer';

import { Posts } from '/imports/collections/posts.js';

import { FeedLayout } from '/imports/components/feed/FeedLayout.jsx';

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

  let subscriptionParams = {
    sort: 'new',
  };

  if (Meteor.subscribe('feed.posts', subscriptionParams).ready()) {
    const posts = Posts.find({}).fetch();
    onData(null, { posts });
  };

}

export const FeedContainer = compose(getTrackerLoader(reactiveMapper))(FeedLayout);