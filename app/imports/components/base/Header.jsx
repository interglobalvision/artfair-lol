import React, { Component } from 'react';

export class Photo extends Component {
  constructor(props) {
    super(props);

    // Bind
    this.handleChange = this.handleChange.bind(this);
  }

  render() {
    return(
      <div>
        <input ref={ input => { this.input = input; }}type="file" accept="image/*" capture="capture" onChange={this.handleChange} />
      </div>
    );
  }

  handleChange(event) {
    var reader = new FileReader();

    var _this = this;

    reader.onload = function (e) {
      const photo = encodeURIComponent(e.target.result);

      e.target.value = '';

      FlowRouter.go('newPost', {
        photo,
      });
    };

    reader.readAsDataURL(this.input.files[0]);
  }
};

export const Header = () => (
  <header>
    <Photo />
  </header>
);

