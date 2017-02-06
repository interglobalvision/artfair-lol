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
    moreComments = <a href={'/post/' + postId} className='font-size-small'>See all comments</a> ;
  }

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
