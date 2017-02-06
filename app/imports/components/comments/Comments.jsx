import React, { Component } from 'react';

import { Comment } from '/imports/components/comments/Comment.jsx';

export const Comments = ({comments, limitComments, postId}) => {

  if (comments === undefined) {
    return null;
  }

  let commentsRows = [];
  let moreComments = null;
  let commentsLimit = Meteor.settings.public.commentsLimit

  if (limitComments && comments.length > commentsLimit) {
    comments = comments.slice(0, commentsLimit);

    moreComments = <a href={'/post/' + postId} className='font-size-small'>See all comments</a> ;
  }

  comments.map((comment, index) => {
    commentsRows.push(<Comment comment={comment} key={index} />);
  });

  return (
    <div className='grid-row post-comments'>
      <div className='grid-item item-s-12'>
        <div className='padding-bottom-tiny font-color-grey'>
          {moreComments}
        </div>
        <ul>
          {commentsRows}
        </ul>
      </div>
    </div>
  )
};
