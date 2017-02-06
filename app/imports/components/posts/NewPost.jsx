import React, { Component } from 'react';

import sanitizeHtml from 'sanitize-html';

import { addPost } from '/imports/api/photosMethods.js';

export class NewPost extends Component {
  constructor(props) {
    super(props);

    let photo = Session.get('newPhoto');
    let fingerprint = Session.get('fingerprint');

    if(photo === undefined) {
      FlowRouter.go('home');
    }

    this.state = {
      photo,
      fingerprint,
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
  }

  onInputChange(event) {
    this.setState({caption: event.target.value});
  }

  onSubmitForm(event) {
    event.preventDefault();

    const photo = this.state.photo;
    const caption = sanitizeHtml(this.state.caption);
    const fingerprint = this.state.fingerprint;

    addPost.call({
      photo,
      caption,
      fingerprint,
    });

    return false;
  }

  render() {
    return (
      <section>
        <div className="grid-row margin-bottom-small">
          <div className="grid-item item-s-12 no-gutter grid-row justify-center align-items-center">
            <img className="post-image" src={this.state.photo} />
          </div>
        </div>
        <form onSubmit={this.onSubmitForm}>
          <textarea className="comment-textarea margin-bottom-small" placeholder="Add a caption" value={this.state.caption} onChange={this.onInputChange} />
          <div className="grid-row margin-bottom-basic">
            <div className="grid-item item-s-12 text-align-center">
              <input className="button font-size-mid" type="submit" value="POST" />
            </div>
          </div>
        </form>
      </section>
    );
  }
};
