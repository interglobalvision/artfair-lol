import React, { Component } from 'react';

export const PostLocation = ({location}) => {
  return (
    <div className='grid-row post-date padding-bottom-micro'>
      <div className='grid-item item-s-12 font-size-small grid-row'>
        <img className='location-icon icon-small' src='/icons/location_on.svg' />{location}
      </div>
    </div>
  );
};
