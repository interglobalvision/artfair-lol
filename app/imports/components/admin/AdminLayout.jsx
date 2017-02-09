import React, { Component } from 'react';

import { AdminPost } from '/imports/components/admin/AdminPost.jsx';

export class AdminLayout extends Component {
  constructor(props) {
    super(props);

    this.morePosts = this.morePosts.bind(this);
  }

  morePosts() {
    Session.set('pagination', (Session.get('pagination') + 1));
  }

  render() {

    if (this.props.posts) {
      return (
        <section id='admin' className='container admin-container padding-top-small'>
          <div className='admin-posts grid-row'>
          {this.props.posts.map((post) => (
            <AdminPost post={post} key={post._id} />
          ))}
          </div>

          {this.props.morePosts &&
            <div className='admin-posts grid-row'>
              <div className='grid-item item-s-12 text-align-center u-pointer padding-top-small padding-bottom-small' onClick={this.morePosts}>
                More Posts
              </div>
            </div>
          }
        </section>
      )
    } else {
      return (
        <section id='admin' className='container admin-container'>
          <div className='admin-posts'>
            <h1>Nothing yet! Post some</h1>
          </div>
        </section>
      )
    }
  }

}
