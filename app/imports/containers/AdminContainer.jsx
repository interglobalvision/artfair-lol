import { Meteor } from 'meteor/meteor';

import { compose } from 'react-komposer';

import { Posts } from '/imports/collections/posts.js';

import { AdminLayout } from '/imports/components/admin/AdminLayout.jsx';

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

  if (!Session.get('pagination')) {
    Session.set('pagination', 1);
  }

  let subscriptionParams = {
    pagination: Session.get('pagination'),
  }

  if (Meteor.subscribe('admin.posts', subscriptionParams).ready()) {

    let limit = (subscriptionParams.pagination * Meteor.settings.public.postsPerPage);

    const posts = Posts.find({}, {
      sort: {
        createdAt: -1,
      },
      limit,
    }).fetch();

    const availablePosts = Posts.find({}, {
      sort: {
        createdAt: -1,
      },
      limit: limit + 1,
    }).fetch().length;

    const morePosts = availablePosts - limit >= 1 ? true : false;

    onData(null, { posts, morePosts });
  };

}

export const AdminContainer = compose(getTrackerLoader(reactiveMapper))(AdminLayout);
