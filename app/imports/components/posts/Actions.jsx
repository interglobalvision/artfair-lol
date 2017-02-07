import React, { Component } from 'react';

import { doVote } from '/imports/api/votesMethods.js';

export class Actions extends Component {
  constructor(props) {
    super(props);

    let fingerprint = Session.get('fingerprint');

    this.state = {
      fingerprint,
    };

    this.onVote = this.onVote.bind(this);
  }

  onVote(event) {
    const postId = this.props.postId;
    const fingerprint = this.state.fingerprint;
    const voteValue = event.target.getAttribute('data-vote');
    const upVotes = this.props.upVotes;
    const downVotes = this.props.downVotes;

    if (voteValue !== undefined) {
      doVote.call({
        postId,
        fingerprint,
        voteValue,
        upVotes,
        downVotes,
      });
    }

    return false;
  }

  render() {
    return (
      <div className='grid-row margin-bottom-small'>
        <div className='grid-item item-s-12'>
          <div className='grid-row align-items-center line-height-tighter border-bottom-grey padding-top-tiny padding-bottom-tiny'>
            <div className='grid-item font-size-large font-bold'>{this.props.upVotes.length} | {this.props.downVotes.length}</div>
            <div className='grid-item'><img className='icon' src='/icons/thumb_up.svg' onClick={this.onVote} data-vote='up' /></div>
            <div className='grid-item margin-top-micro'><img className='icon' src='/icons/thumb_down.svg' onClick={this.onVote} data-vote='down' /></div>
            <div className='grid-item margin-top-micro'><a href={'/post/' + this.props.postId}><img className='icon' src='/icons/comment.svg' /></a></div>
          </div>
        </div>
      </div>
    );
  }
};
