import React, { Component } from 'react';

import { FeedPost } from '/imports/components/posts/FeedPost.jsx';

import { NewPostsNotice } from '/imports/components/feed/NewPostsNotice.jsx';

export class FeedLayout extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll(event) {
    if (document.body.scrollTop + window.innerHeight === document.getElementById('main-container').clientHeight) {
      console.log('more posts');
      let pagination = Session.get('pagination') || 1;
      Session.set('pagination', pagination + 1);
    }
  }


  render() {

    if (this.props.posts) {
      return (
        <section id='feed'>
          <NewPostsNotice newPosts={this.props.newPosts} />
          <div className='feed-posts'>
            {this.props.posts.map((post, key) => (
              <FeedPost post={post} key={key} />
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
