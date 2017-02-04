import React, { Component } from 'react';

export class Comment extends Component {

  render() {

    if (this.props.comment) {
      return (
        <li><p className='margin-bottom-tiny'>{this.props.comment}</p></li>
      );
    }
  }
}
