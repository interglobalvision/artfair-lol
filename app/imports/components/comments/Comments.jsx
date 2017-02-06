import React, { Component } from 'react';

import { Comment } from '/imports/components/comments/Comment.jsx';

export const Comments = ({comments, commentsLimit, postId}) => {

  if (comments === undefined) {
    return null;
  }

  let commentsRows = [];
  let moreComments = null;

  if (commentsLimit === undefined ) {
    commentsLimit = comments.length;
  }

  comments.slice(0, commentsLimit).map((comment, index) => {
    commentsRows.push(<Comment comment={comment} key={index} />);
  });

  if (comments.length > commentsLimit) {
    moreComments =
      <div className='padding-bottom-tiny font-color-grey'>
        <a href={'/post/' + postId} className='font-size-small'>See all comments</a>
      </div>
    ;
  }

  return (
    <div className='grid-row post-comments'>
      <div className='grid-item item-s-12'>
        {moreComments}
        <ul>
          {commentsRows}
        </ul>
      </div>
    </div>
  )
};
