import React, { Component } from 'react';

import { doVote } from '/imports/api/votesMethods.js';

export class Actions extends Component {
  constructor(props) {
    super(props);

    this.onVote = this.onVote.bind(this);
  }

  numVotes() {
    return this.props.upVotes.length - this.props.downVotes.length;
  }

  getUpvoted() {
    return this.props.upVotes.indexOf( Session.get('fingerprint') ) > -1 ? true : false;
  }

  getDownvoted() {
    return this.props.downVotes.indexOf( Session.get('fingerprint') ) > -1 ? true : false;
  }

  onVote(event) {
    const postId = this.props.postId;
    const fingerprint = Session.get('fingerprint');
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
            <div className='grid-item item-s-3 font-size-large font-bold num-votes'>{this.numVotes()}</div>
            <div className='grid-item item-s-3 text-align-center'><img className='icon' src='/icons/thumb_up.svg' onClick={this.onVote} data-vote='up' data-voted={this.getUpvoted()} /></div>
            <div className='grid-item item-s-3 margin-top-micro text-align-center'><img className='icon' src='/icons/thumb_down.svg' onClick={this.onVote} data-vote='down' data-voted={this.getDownvoted()} /></div>
            <div className='grid-item item-s-3 margin-top-micro text-align-right'><a href={'/post/' + this.props.postId}><img className='icon' src='/icons/comment.svg' /></a></div>
          </div>
        </div>
      </div>
    );
  }
};