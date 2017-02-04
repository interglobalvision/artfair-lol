import React, { Component } from 'react';

import { Comment } from '/imports/components/comments/Comment.jsx';

export class Comments extends Component {

  render() {

    if (this.props.comments) {
      return (
        <div className='grid-row post-comments'>
          <div className='grid-item item-s-12'>
            <ul>
              {this.props.comments.map((comment, key) => (
                <Comment comment={comment} key={key} />
              ))}
            </ul>
          </div>
        </div>
      )
    }

  }

}
