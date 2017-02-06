import React, { Component } from 'react';

import { Caption } from '/imports/components/posts/Caption.jsx';
import { Comments } from '/imports/components/comments/Comments.jsx';
import { NewComment } from '/imports/components/comments/NewComment.jsx';

export class SinglePost extends Component {
  render() {
    return (
      <div className='post-feed padding-bottom-mid'>
        <div className='grid-row'>
          <div className='grid-item item-s-12 no-gutter'>
            <img className='post-image' src={this.props.post.photo} />
          </div>
        </div>
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

        <Caption caption={this.props.post.caption} />

        <div className='grid-row post-date padding-bottom-tiny'>
          <div className='grid-item item-s-12 font-uppercase font-color-grey font-size-small'>
            {moment(this.props.post.createdAt).fromNow()}
          </div>
        </div>

        <Comments comments={this.props.post.comments} postId={this.props.post._id} />

        <NewComment postId={this.props.post._id} />

      </div>
    );
  }
};
