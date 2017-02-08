import React, { Component } from 'react';

import { PostPhoto } from '/imports/components/posts/PostPhoto.jsx';
import { Actions } from '/imports/components/posts/Actions.jsx';
import { Caption } from '/imports/components/posts/Caption.jsx';
import { TimeLocation } from '/imports/components/posts/TimeLocation.jsx';
import { Comments } from '/imports/components/comments/Comments.jsx';
import { NewComment } from '/imports/components/comments/NewComment.jsx';

export class SinglePost extends Component {
  componentDidMount() {
    if (this.props.scrollTo !== undefined) {
      $('html, body').stop().animate({ scrollTop: ( $('#' + this.props.scrollTo).offset().top - 100 )}, 300);
    } else {
      $('html, body').stop().animate({ scrollTop: 0 }, 300);
    }
  }

  render() {
    return (
      <div className='post-feed padding-bottom-small'>

        <PostPhoto photo={this.props.post.photo} />

        <Actions upVotes={this.props.post.upVotes} downVotes={this.props.post.downVotes} postId={this.props.post._id} singlePost={true} />

        <Caption caption={this.props.post.caption} />

        <TimeLocation createdAt={this.props.post.createdAt} postId={this.props.post._id} location={this.props.post.location} />

        <Comments comments={this.props.post.comments} limitComments={false} postId={this.props.post._id} />

        <NewComment postId={this.props.post._id} />

      </div>
    );
  }
};
