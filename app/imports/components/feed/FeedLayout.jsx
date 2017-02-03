import React, { Component } from 'react';

import { FeedPost } from '/imports/components/posts/FeedPost.jsx';

export class FeedLayout extends Component {

  render() {

    if (this.props.posts) {
      return (
        <section id='feed'>
          <div className='feed-posts'>
          {this.props.posts.map((post, key) => (
            <FeedPost post={post} />
          ))}
          </div>

          <div className='feed-pagination'>
            <h1>**more posts ++</h1>
          </div>
        </section>
      )
    } else {
      return (
        <section id='feed'>
          <div className='feed-posts'>
            <h1>Nothing yet! Post some</h1>
          </div>
        </section>
      )
    }
  }

}
