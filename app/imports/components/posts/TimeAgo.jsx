import React, { Component } from 'react';

export const TimeAgo = ({createdAt}) => {
  if (createdAt === null) {
    return null;
  }

  return (
    <div className='grid-row post-date padding-bottom-tiny'>
      <div className='grid-item item-s-12 font-uppercase font-color-grey font-size-small'>
        {moment(createdAt).fromNow()}
      </div>
    </div>
  );
};
