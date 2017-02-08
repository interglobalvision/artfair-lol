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
    this.getExif(this.input.files[0], this.passPhoto.bind(this));
  }

  passPhoto(exif) {
    var reader = new FileReader();

    reader.onload = function (e) {
      const image = e.target.result;

      e.target.value = '';

      Session.set('newPhoto', {
        image,
        exif,
      });

      FlowRouter.go('/new');
    };

    reader.readAsDataURL(this.input.files[0]);
  }


  // From http://stackoverflow.com/a/32490603/2624099
  getExif(file, callback) {
    let reader = new FileReader();

    reader.onload = function(e) {
      callback(EXIF.readFromBinaryFile(e.target.result));
    };

    reader.readAsArrayBuffer(file);
  }
};
