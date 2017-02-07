import React, { Component } from 'react';
import { PhotoInput } from '/imports/components/PhotoInput.jsx';
import Sticky from 'react-stickynode';

export const Header = () => (
  <Sticky>
    <header id='header' className='border-bottom-grey line-height-tighter'>
      <div className='container'>
        <nav id='header-nav' className='grid-row align-items-center text-align-center'>
          <div className='grid-item item-s-2'>
            <button className='button button-small font-size-small'>NEW</button>
          </div>
          <div className='grid-item item-s-8'>
            <a href='/'><img id='app-logo' src='/icons/artfair-lol-logo.svg' className='icon' /></a>
            <h1 className='u-visuallyhidden'>Artfair.lol</h1>
          </div>
          <div className='grid-item item-s-2'>
            <PhotoInput />
            <label id="add-photo-label" htmlFor="add-photo-input">
              <img src="/icons/add_a_photo.svg" className="icon" />
            </label>
          </div>
        </nav>
      </div>
    </header>
  </Sticky>
);
