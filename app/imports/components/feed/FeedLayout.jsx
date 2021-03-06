import React, { Component } from 'react';

import { FeedPost } from '/imports/components/posts/FeedPost.jsx';

import { NewPostsNotice } from '/imports/components/feed/NewPostsNotice.jsx';

export class FeedLayout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      paginationTriggered: false,
    };

    this.handleScroll = this.handleScroll.bind(this);
  }

  componentWillMount() {
    Session.set('pagination', 1);

    this.bindScroll();
  }

  componentWillUnmount() {
    this.unbindScroll();
  }

  componentDidUpdate() {

    this.state = {
      paginationTriggered: false,
    };

  }

  bindScroll() {
    window.addEventListener("scroll", this.handleScroll);
  }

  unbindScroll() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll(event) {
    if (this.state.paginationTriggered) {
      return false;
    }

    let comparator;

    if (document.getElementById('feed-pagination')) {
      comparator = document.getElementById('main-container').clientHeight - (document.getElementById('about').clientHeight + document.getElementById('feed-pagination').clientHeight);
    } else {
      comparator = document.getElementById('main-container').clientHeight - document.getElementById('about').clientHeight;
    }

    if (document.body.scrollTop + window.innerHeight >= comparator) {
      if(this.props.morePosts) {
        setTimeout( () => {
          let pagination = Session.get('pagination') || 1;
          Session.set('pagination', pagination + 1);
        }, 600);
      } else {
        this.unbindScroll();
      }

      this.state = {
        paginationTriggered: true,
      };
    }
  }


  render() {

    if (this.props.posts) {
      return (
        <section id='feed' className='container padding-top-small'>
          {this.props.notifyNewPosts &&
            <NewPostsNotice newPosts={this.props.newPosts} />
          }
          <div className='feed-posts'>
            {this.props.posts.map((post) => (
              <FeedPost post={post} key={post._id} />
            ))}
          </div>

          {this.props.morePosts &&
            <div id='feed-pagination' className='text-align-center padding-top-small padding-bottom-small'>
              <img src="/icons/spinner.svg" id="spinner" className="icon spin" />
            </div>
          }
        </section>
      )
    } else {
      return (
        <section id='feed' className='container'>
          <div className='feed-posts'>
            <h1>Nothing yet! Post some</h1>
          </div>
        </section>
      )
    }
  }

}
