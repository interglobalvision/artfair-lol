import React, { Component } from 'react';

import { PostPhoto } from '/imports/components/posts/PostPhoto.jsx';
import { Actions } from '/imports/components/posts/Actions.jsx';
import { AdminActions } from '/imports/components/admin/AdminActions.jsx';
import { Caption } from '/imports/components/posts/Caption.jsx';
import { Comments } from '/imports/components/comments/Comments.jsx';
import { TimeAgo } from '/imports/components/posts/TimeAgo.jsx';

export class AdminPost extends Component {
  render() {
    return (
      <div className='grid-item item-s-6 item-m-4 item-l-3 post-admin padding-bottom-mid'>

        <PostPhoto photo={this.props.post.photo} />

        <AdminActions postId={this.props.post._id} />

        {this.props.post.ranking &&
          <div className='grid-row'>
            <div className='grid-item item-s-12 font-size-small margin-bottom-micro'>
              Ranking value: {this.props.post.ranking}
            </div>
          </div>
        }

        <Caption caption={this.props.post.caption} />

        <Comments comments={this.props.post.comments} limitComments={true} postId={this.props.post._id} />

        <TimeAgo createdAt={this.props.post.createdAt} />

      </div>
    );
  }
};
