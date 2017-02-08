import React, { Component } from 'react';

export const TimeLocation = ({postId, createdAt, location}) => {
  return (
    <div className='grid-row post-date padding-bottom-tiny font-color-grey font-size-small'>
      <div className='grid-item font-uppercase'>
        <a href={'/post/' + postId}>{moment(createdAt).fromNow()}</a>
      </div>
      <div className='grid-item'>
        {location}
      </div>
    </div>
  );
};
