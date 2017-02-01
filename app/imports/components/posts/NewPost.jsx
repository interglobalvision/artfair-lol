import React, { Component } from 'react';

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
  }

  render() {
    return (
      <section>
        <img src={this.state.photo} />
        <form onSubmit={this.handleSubmit}>
          <textarea value={this.state.caption} onChange={this.handleChange} />
          <input type="submit" value="Submit" />
        </form>
      </section>
    );
  }
};
