import React, { Component } from 'react';

export class PhotoInput extends Component {
  constructor(props) {
    super(props);

    // Bind
    this.onFileInputChange = this.onFileInputChange.bind(this);
  }

  render() {
    return(
      <input ref={ input => { this.input = input; }} type="file" accept="image/*" capture="capture" onChange={this.onFileInputChange} />
    );
  }

  onFileInputChange(event) {
    var reader = new FileReader();

    reader.onload = function (e) {
      const photo = e.target.result;

      e.target.value = '';

      Session.set('newPhoto', photo);

      FlowRouter.go('newPost');
    };

    reader.readAsDataURL(this.input.files[0]);
  }
};
