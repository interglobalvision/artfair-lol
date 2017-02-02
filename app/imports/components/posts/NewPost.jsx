import React, { Component } from 'react';

import { addPost } from '/imports/api/photosMethods.js';

export class NewPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photo: this.props.photo,
      caption: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({caption: event.target.value});
  }

  handleSubmit(event) {
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
        <form onSubmit={this.handleSubmit}>
          <textarea value={this.state.caption} onChange={this.handleChange} />
          <input type="submit" value="Submit" />
        </form>
        <button onClick={this.handlesubmit}>SUBMIT</button>
      </section>
    );
  }
};
