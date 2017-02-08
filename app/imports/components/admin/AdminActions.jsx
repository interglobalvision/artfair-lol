import React, { Component } from 'react';

import { removePost } from '/imports/api/adminMethods.js';

export class AdminActions extends Component {
  constructor(props) {
    super(props);

    this.onRemove = this.onRemove.bind(this);
  }

  onRemove() {
    removePost.call({
      postId: this.props.postId,
    });
  }

  render() {
    return (
      <div className='grid-row margin-top-tiny margin-bottom-tiny'>
        <div className='grid-item item-s-12'>
          <div className='grid-row align-items-center line-height-tighter border-bottom-grey padding-bottom-tiny text-align-center'>
            <div className='grid-item font-bold num-votes'><button className="button button-small" onClick={this.onRemove}>Remove</button></div>
          </div>
        </div>
      </div>
    );
  }
};
