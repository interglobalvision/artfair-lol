import React, { Component } from 'react';

import { doVote } from '/imports/api/votesMethods.js';

export class Actions extends Component {
  constructor(props) {
    super(props);

    this.onVote = this.onVote.bind(this);
    this.scrollToComments = this.scrollToComments.bind(this);
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

  scrollToComments() {
    $('html, body').stop().animate({ scrollTop: ( $('#new-comment').offset().top - 100 )}, 300);
  }

  render() {
    return (
      <div className='grid-row margin-bottom-small'>
        <div className='grid-item item-s-12'>
          <div className='grid-row align-items-center line-height-tighter border-bottom-grey padding-top-tiny padding-bottom-tiny text-align-center'>
            <div className='grid-item item-s-3 font-size-large font-bold num-votes'>{this.numVotes()}</div>
            <div className='grid-item item-s-3'><img className='icon u-pointer' src='/icons/thumb_up.svg' onClick={this.onVote} data-vote='up' data-voted={this.getUpvoted()} /></div>
            <div className='grid-item item-s-3 margin-top-micro'><img className='icon u-pointer' src='/icons/thumb_down.svg' onClick={this.onVote} data-vote='down' data-voted={this.getDownvoted()} /></div>
            {!this.props.singlePost &&
              <div className='grid-item item-s-3 margin-top-micro'><a href={FlowRouter.path('singlePostScroll', { id: this.props.postId, scroll: 'new-comment'})}><img className='icon' src='/icons/comment.svg' /></a></div>
            }
            {this.props.singlePost &&
              <div className='grid-item item-s-3 margin-top-micro'><img onClick={this.scrollToComments} className='icon u-pointer' src='/icons/comment.svg' /></div>
            }
          </div>
        </div>
      </div>
    );
  }
};
