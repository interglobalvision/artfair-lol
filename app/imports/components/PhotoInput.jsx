import React, { Component } from 'react';

import EXIF from 'exif-js';

export class PhotoInput extends Component {
  constructor(props) {
    super(props);

    // Bind
    this.onFileInputChange = this.onFileInputChange.bind(this);
  }

  render() {
    return(
      <input id="add-photo-input" name="add-photo-input" ref={ input => { this.input = input; }} type="file" accept="image/*" capture="capture" onChange={this.onFileInputChange} />
    );
  }

  onFileInputChange(event) {
    this.passPhoto(this.input.files[0]);
    event.target.value = '';
  }

  passPhoto(file) {
    var reader = new FileReader();

    reader.onload = function (e) {
      const image = e.target.result;

      Session.set('newPhoto', image);

      FlowRouter.go('/new');
    };

    reader.readAsDataURL(file);
  }
};
