import React, { Component } from 'react';

export class NewPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      caption: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({caption: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.caption);
    event.preventDefault();
  }

  render() {
    return (
      <section>
        <img src={this.props.photo} />
        <form onSubmit={this.handleSubmit}>
          <textarea value={this.state.caption} onChange={this.handleChange} />
          <input type="submit" value="Submit" />
        </form>
      </section>
    );
  }
};
