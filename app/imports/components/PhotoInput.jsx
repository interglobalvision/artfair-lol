import React, { Component } from 'react';

import EXIF from 'exif-js';

export class PhotoInput extends Component {
  constructor(props) {
    super(props);

    // Bind
    this.onFileInputChange = this.onFileInputChange.bind(this);
    this.disablePosting = Meteor.settings.public.disablePosting;
  }

  render() {
    return(
      <input id="add-photo-input" name="add-photo-input" ref={ input => { this.input = input; }} type="file" accept="image/*" capture="capture" onChange={this.onFileInputChange} disabled={this.disablePosting} />
    );
  }

  onFileInputChange(event) {
    if (!this.disablePosting) {
      this.passPhoto(this.input.files[0]);
    }
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
