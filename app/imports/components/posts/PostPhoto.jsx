import React, { Component } from 'react';

export const PostPhoto = ({photo}) => {
  if (photo === null) {
    return null;
  }

  return (
    <div className='grid-row'>
      <div className='grid-item item-s-12 no-gutter'>
        <img className='post-image' src={photo} />
      </div>
    </div>
  );
};
