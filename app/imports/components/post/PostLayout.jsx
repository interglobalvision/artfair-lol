import React, { Component } from 'react';

import { SinglePost } from '/imports/components/posts/SinglePost.jsx';

export class PostLayout extends Component {

  render() {
    if (this.props.post) {
      return (
        <section id='post' className='container padding-top-small'>
          <div className='post'>
            <SinglePost post={this.props.post} scrollTo={this.props.scrollTo} />
          </div>
        </section>
      )
    } else {
      return (
        <section id='post'>
          <div className='post' className='container'>
            <h1>Nothing yet! Post some</h1>
          </div>
        </section>
      )
    }
  }

}
