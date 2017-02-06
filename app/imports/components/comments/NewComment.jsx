import React, { Component } from 'react';

import sanitizeHtml from 'sanitize-html';

import { addComment } from '/imports/api/commentsMethods.js';

export class NewComment extends Component {
  constructor(props) {
    super(props);

    this.state = {comment: ''};

    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.clearInput = this.clearInput.bind(this);
  }

  onInputChange(event) {
    this.setState({comment: event.target.value});
  }

  clearInput() {
    this.setState({comment: ''});
  }

  onSubmitForm(event) {
    event.preventDefault();

    const comment = sanitizeHtml(this.state.comment);

    if (comment !== '') {

      addComment.call({
        postId: this.props.postId,
        comment,
      }, this.clearInput);

    }

    return false;
  }

  render() {
    return (
      <form onSubmit={this.onSubmitForm}>
        <textarea className="comment-textarea margin-bottom-small" placeholder="Add a comment" value={this.state.comment} onChange={this.onInputChange} />
        <div className="grid-row margin-bottom-basic">
          <div className="grid-item item-s-12 text-align-center">
            <input className="button font-size-mid" type="submit" value="COMMENT" />
          </div>
        </div>
      </form>
    );
  }
};
