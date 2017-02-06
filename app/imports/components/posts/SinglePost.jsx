import React, { Component } from 'react';

import { PostPhoto } from '/imports/components/posts/PostPhoto.jsx';
import { Actions } from '/imports/components/posts/Actions.jsx';
import { Caption } from '/imports/components/posts/Caption.jsx';
import { TimeAgo } from '/imports/components/posts/TimeAgo.jsx';
import { Comments } from '/imports/components/comments/Comments.jsx';
import { NewComment } from '/imports/components/comments/NewComment.jsx';

export class SinglePost extends Component {
  render() {
    return (
      <div className='post-feed padding-bottom-mid'>

        <PostPhoto photo={this.props.post.photo} />

        <Actions />

        <Caption caption={this.props.post.caption} />

        <TimeAgo createdAt={this.props.post.createdAt} />

        <Comments comments={this.props.post.comments} limitComments={false} postId={this.props.post._id} />

        <NewComment postId={this.props.post._id} />

      </div>
    );
  }
};
