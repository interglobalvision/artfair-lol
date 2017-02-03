import React, { Component } from 'react';

export class FeedPost extends Component {
  render() {
    return (
      <div className='post-feed'>
        <div className='grid-row border-bottom-grey'>
          <div className='grid-item item-s-12'>
            <img src={this.props.photo} />
            <div className='caption'>
              {this.props.caption}
            </div>
          </div>
        </div>
      </div>
    );
  }
};
