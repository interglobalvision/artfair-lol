import React, { Component } from 'react';

import { SinglePost } from '/imports/components/posts/SinglePost.jsx';

export class PostLayout extends Component {

  render() {
    if (this.props.post) {
      return (
        <section id='post'>
          <div className='post'>
            <SinglePost post={this.props.post} />
          </div>
        </section>
      )
    } else {
      return (
        <section id='post'>
          <div className='post'>
            <h1>Nothing yet! Post some</h1>
          </div>
        </section>
      )
    }
  }

}
