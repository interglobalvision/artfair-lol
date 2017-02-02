import React, { Component } from 'react';

import { addPost } from '/imports/api/photosMethods.js';

export class NewPost extends Component {
  constructor(props) {
    super(props);

    let photo = Session.get('newPhoto');

    if(photo === undefined) {
      FlowRouter.go('home');
    }

    this.state = {
      photo: photo,
      caption: ''
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
    const caption = this.state.caption;

    addPost.call({
      photo,
      caption,
    });

    return false;
  }

  render() {
    return (
      <section>
        <div className="grid-row border-bottom-grey">
          <div id="new-post-image-holder" className="grid-item item-s-12 no-gutter grid-row justify-center align-items-center">
            <img id="new-post-image" className="post-image" src={this.state.photo} />
          </div>
        </div>
        <form onSubmit={this.onSubmitForm}>
          <textarea className="comment-textarea border-bottom-grey margin-bottom-small" placeholder="Add a caption" value={this.state.caption} onChange={this.onInputChange} />
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
