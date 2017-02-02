import React, { Component } from 'react';

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
        <img src={this.state.photo} />
        <form onSubmit={this.onSubmitForm}>
          <textarea value={this.state.caption} onChange={this.onInputChange} />
          <input type="submit" value="Submit" />
        </form>
      </section>
    );
  }
};
