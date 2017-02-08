import React, { Component } from 'react';

import { PostPhoto } from '/imports/components/posts/PostPhoto.jsx';
import { Actions } from '/imports/components/posts/Actions.jsx';
import { Caption } from '/imports/components/posts/Caption.jsx';
import { Comments } from '/imports/components/comments/Comments.jsx';
import { TimeLocation } from '/imports/components/posts/TimeLocation.jsx';

export class FeedPost extends Component {
  render() {
    return (
      <div className='post-feed padding-bottom-mid'>

        <PostPhoto photo={this.props.post.photo} />

        <Actions upVotes={this.props.post.upVotes} downVotes={this.props.post.downVotes} postId={this.props.post._id} />

        <Caption caption={this.props.post.caption} />

        <Comments comments={this.props.post.comments} limitComments={true} postId={this.props.post._id} />

        <TimeLocation createdAt={this.props.post.createdAt} postId={this.props.post._id} location={this.props.post.location} />

      </div>
    );
  }
};
