import React, { Component } from 'react';

export const LocationNotice = ({checking, approved, location, unavailable}) => {
  return (
    <div className="grid-row padding-top-small padding-bottom-small justify-center text-align-center">
    {checking &&
        <span className="animation-phase"><img className='location-icon icon-small' src='/icons/location_searching.svg' />Finding your location...</span>
    }
    {!checking && approved &&
        <span><img className='location-icon icon-small' src='/icons/location_on.svg' />{location}</span>
    }
    {!checking && !approved && !unavailable &&
        <span><img className='location-icon icon-small' src='/icons/location_off.svg' />You must be at an art fair to post</span>
    }
    {!checking && !approved && unavailable &&
        <span><img className='location-icon icon-small' src='/icons/location_off.svg' />We can't find your location.<br/>Please enable location for your browser<br/>and try again.</span>
    }
    </div>
  );
};
