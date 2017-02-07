import React, { Component } from 'react';

import { AdminPost } from '/imports/components/admin/AdminPost.jsx';

import { NewPostsNotice } from '/imports/components/feed/NewPostsNotice.jsx';

export class AdminLayout extends Component {

  render() {

    if (this.props.posts) {
      return (
        <section id='admin'>
          <NewPostsNotice newPosts={this.props.newPosts} />
          <div className='admin-posts'>
          {this.props.posts.map((post, key) => (
            <AdminPost post={post} key={key} />
          ))}
          </div>

          <div className='feed-pagination'>
            <h1>**more posts ++</h1>
          </div>
        </section>
      )
    } else {
      return (
        <section id='admin'>
          <div className='admin-posts'>
            <h1>Nothing yet! Post some</h1>
          </div>
        </section>
      )
    }
  }

}
