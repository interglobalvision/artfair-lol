import React, { Component } from 'react';

export class NewPostsNotice extends Component {
  constructor(props) {
    super(props);

    this.resetFeedTimestamp = this.resetFeedTimestamp.bind(this);
  }

  resetFeedTimestamp() {
    Session.set('feedTimestamp', new Date());
  }

  render() {
    if (!this.props.newPosts) {
      return null;
    }

    return (
      <p onClick={this.resetFeedTimestamp}>{this.props.newPosts} new posts</p>
    );
  }
};
