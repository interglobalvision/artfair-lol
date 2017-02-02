import React, { Component } from 'react';

import { addPost } from '/imports/api/photosMethods.js';

export class NewPost extends Component {
  constructor(props) {
    super(props);

    let photo = Session.get('newPhoto');

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
        <img src={this.state.photo} />
        <form onSubmit={this.onSubmitForm}>
          <textarea value={this.state.caption} onChange={this.onInputChange} />
          <input type="submit" value="Submit" />
        </form>
      </section>
    );
  }
};
