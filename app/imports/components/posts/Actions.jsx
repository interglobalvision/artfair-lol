import React, { Component } from 'react';

export class Actions extends Component {
  render() {
    return (
      <div className='grid-row margin-bottom-small'>
        <div className='grid-item item-s-12'>
          <div className='grid-row align-items-center line-height-tighter border-bottom-grey padding-top-tiny padding-bottom-tiny'>
            <div className='grid-item font-size-large font-bold'>99</div>
            <div className='grid-item'><img className='icon' src='/icons/thumb_up.svg' /></div>
            <div className='grid-item margin-top-micro'><img className='icon' src='/icons/thumb_down.svg' /></div>
            <div className='grid-item margin-top-micro'><img className='icon' src='/icons/comment.svg' /></div>
          </div>
        </div>
      </div>
    );
  }
};
