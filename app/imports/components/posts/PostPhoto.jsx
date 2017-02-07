import React, { Component } from 'react';

export const PostPhoto = ({photo}) => {
  return (
    <div className='grid-row'>
      <div className='grid-item item-s-12 no-gutter'>
        <img className='post-image' src={photo} />
      </div>
    </div>
  );
};
