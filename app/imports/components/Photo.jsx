import React, { Component } from 'react';

export class Photo extends Component {
  constructor(props) {
    super(props);

    // Bind
    this.onFileInputChange = this.onFileInputChange.bind(this);
  }

  render() {
    return(
      <input ref={ input => { this.input = input; }}type="file" accept="image/*" capture="capture" onChange={this.onFileInputChange} />
    );
  }

  onFileInputChange(event) {
    var reader = new FileReader();

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
