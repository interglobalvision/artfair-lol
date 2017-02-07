import React, { Component } from 'react';

import { doVote } from '/imports/api/votesMethods.js';

export class Actions extends Component {
  constructor(props) {
    super(props);

    this.onVote = this.onVote.bind(this);
  }

  onVote(event) {
    let voteValue = event.target.getAttribute('data-vote');

    if (voteValue !== undefined) {
      doVote.call({
        postId: this.props.postId,
        voteValue,
      });
    }

    return false;
  }

  render() {
    return (
      <div className='grid-row margin-bottom-small'>
        <div className='grid-item item-s-12'>
          <div className='grid-row align-items-center line-height-tighter border-bottom-grey padding-top-tiny padding-bottom-tiny'>
            <div className='grid-item font-size-large font-bold'>{this.props.upVotes}, {this.props.downVotes}</div>
            <div className='grid-item'><img className='icon' src='/icons/thumb_up.svg' onClick={this.onVote} data-vote='up' /></div>
            <div className='grid-item margin-top-micro'><img className='icon' src='/icons/thumb_down.svg' onClick={this.onVote} data-vote='down' /></div>
            <div className='grid-item margin-top-micro'><a href={'/post/' + this.props.postId}><img className='icon' src='/icons/comment.svg' /></a></div>
          </div>
        </div>
      </div>
    );
  }
};
