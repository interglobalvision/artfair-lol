import React, { Component } from 'react';

export const LocationNotice = ({checking, approved, location}) => {
  return (
    <div className="grid-row padding-top-small padding-bottom-small justify-center">
    {checking &&
        <span class="animation-phase"><img className='location-icon icon-small' src='/icons/location_searching.svg' />Finding your location...</span>
    }
    {!checking && approved &&
        <span><img className='location-icon icon-small' src='/icons/location_on.svg' />{location}</span>
    }
    {!checking && !approved &&
        <span><img className='location-icon icon-small' src='/icons/location_off.svg' />You must be at an art fair to post</span>
    }
    </div>
  );
};
