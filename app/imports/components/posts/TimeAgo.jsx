import React, { Component } from 'react';

export const TimeAgo = ({postId, createdAt}) => {
  return (
    <div className='grid-row post-date padding-bottom-tiny'>
      <div className='grid-item item-s-12 font-uppercase font-color-grey font-size-small'>
        <a href={'/post/' + postId}>{moment(createdAt).fromNow()}</a>
      </div>
    </div>
  );
};
