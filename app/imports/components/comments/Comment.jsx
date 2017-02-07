import React, { Component } from 'react';

import { linkHashtagsHtml } from '/imports/lib/text.js';

export class Comment extends Component {

  render() {

    if (this.props.comment) {
      return (
        <li><p className='margin-bottom-tiny' dangerouslySetInnerHTML={linkHashtagsHtml(this.props.comment)}></p></li>
      );
    }
  }
}
