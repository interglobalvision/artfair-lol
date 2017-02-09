import React, { Component } from 'react';
import EXIF from 'exif-js';

import 'image-compressor';
import '/imports/lib/Blob.js';

import { distanceFrom } from '/imports/lib/geometry.js';

import sanitizeHtml from 'sanitize-html';

import { addPost } from '/imports/api/photosMethods.js';
import { LocationNotice } from '/imports/components/posts/LocationNotice.jsx';

export class NewPost extends Component {
  constructor(props) {
    super(props);

    let fingerprint = Session.get('fingerprint');

    this.originalImageSrc = Session.get('newPhoto');

    this.imageOrientation = false;
    this.optimizedImage = false;

    this.state = {
      fingerprint,
      processingImage: true,
      locationChecking: true,
      locationApproved: false,
      uploading: false
    };

    this.checkGeofence = this.checkGeofence.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.getOrientation = this.getOrientation.bind(this);
    this.handleExif = this.handleExif.bind(this);
    this.processImage = this.processImage.bind(this);
    this.optimizeImage = this.optimizeImage.bind(this);
    this.imageResizedCallback = this.imageResizedCallback.bind(this);

  }

  componentWillMount() {
    // If image is empty redirect back to home
    // It's unlikely to happen since we already have this condition
    // in the router… but just in case.
    if(this.originalImageSrc === undefined) {
      FlowRouter.go('home');
    } else {
      navigator.geolocation.getCurrentPosition(this.checkGeofence);
      this.rebuildFile();
    }
  }

  rebuildFile() {
    let imageSrc = this.originalImageSrc;

    this.phantomImage = new Image();
    this.phantomImage.onload = this.processImage;
    this.phantomImage.src =  imageSrc;
  }

  // This image is bound to `this.phantomImage.onLoad` so it runs everytime
  // `this.phantomImage` src is changed
  processImage() {
    if(!this.imageOrientation) {
      this.getOrientation();
    } else if(!this.optimizedImage) {
      this.optimizeImage();
    } else {
      this.setState({
        imageReady: true,
        finalImage: this.phantomImage.src,
        processingImage: false,
      });
    }
  }

  getOrientation() {
    EXIF.getData(this.phantomImage, this.handleExif);
  }

  handleExif() {
    let orientation = EXIF.getTag(this.phantomImage, 'Orientation');

    if(orientation) {
      this.imageOrientation = orientation;
      this.fixImageOrientation();
    } else {
      this.imageOrientation = 1;
      this.processImage();
    }
  }

  // Fixes images with orientation saves the result in `this.phantomImage.src`
  fixImageOrientation() {
    let width = this.phantomImage.width;
    let height = this.phantomImage.height;
    let orientation = this.imageOrientation;

    if(orientation) {
      let canvas = document.createElement('canvas');
      let ctx = canvas.getContext('2d');

      // set proper canvas dimensions before transform & export
      if ([5,6,7,8].indexOf(orientation) > -1) {
        canvas.width = height;
        canvas.height = width;
      } else {
        canvas.width = width;
        canvas.height = height;
      }

      // transform context before drawing image
      switch (orientation) {
        case 2: ctx.transform(-1, 0, 0, 1, width, 0); break;
        case 3: ctx.transform(-1, 0, 0, -1, width, height ); break;
        case 4: ctx.transform(1, 0, 0, -1, 0, height ); break;
        case 5: ctx.transform(0, 1, 1, 0, 0, 0); break;
        case 6: ctx.transform(0, 1, -1, 0, height , 0); break;
        case 7: ctx.transform(0, -1, -1, 0, height , width); break;
        case 8: ctx.transform(0, -1, 1, 0, 0, width); break;
        default: ctx.transform(1, 0, 0, 1, 0, 0);
      }

      // draw image
      ctx.drawImage(this.phantomImage, 0, 0);

      // export base64
      let mimeType = Meteor.settings.public.imageCompression.mimeType;
      this.phantomImage.src = canvas.toDataURL(mimeType, 1);
    }

  }

  // Recompress into optimized jpg and resize when neede; saves the result in `this.phantomImage.src`
  optimizeImage() {
    let imageWidth = this.phantomImage.width;
    let imageHeight = this.phantomImage.height;

    let ratio = Meteor.settings.public.imageCompression.maxWidth / imageWidth;

    // If image is smaller than maxWidth set ratio to 1
    // in order to keep image from resizing
    if (ratio > 1) {
      ratio = 1;
    }

    let newWidth = imageWidth * ratio;
    let newHeight = imageHeight * ratio;

    let imageCompressor = new ImageCompressor;

    imageCompressor.run(this.phantomImage.src, {
      toWidth: newWidth,
      toHeight: newHeight,
      mimeType:  Meteor.settings.public.imageCompression.mimeType,
      mode: Meteor.settings.public.imageCompression.mode,
      quality: Meteor.settings.public.imageCompression.quality,
      speed: Meteor.settings.public.imageCompression.speed,
    }, this.imageResizedCallback);

  }

  imageResizedCallback(img) {
    this.phantomImage.src = img;
    this.optimizedImage = true;
  }

  checkGeofence(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    let fenceMatch = _.find(Meteor.settings.public.geofences, function(fence) {
      let distance = distanceFrom({
        lat1: latitude,
        lng1: longitude,
        lat2: fence.latitude,
        lng2: fence.longitude
      });

      if (distance <= (fence.radius / 1000)) {
        return true;
      } else {
        return false;
      }

    });

    this.setState({
      'locationChecking': false
    });

    if (fenceMatch) {
      this.setState({
        'locationApproved': true,
        'location': fenceMatch.name
      });
    } else {
      this.setState({
        'locationApproved': false
      });
    }

  }

  getSlingshotUploader() {
    return new Slingshot.Upload('imageUpload');
  }

  uploadFile() {
    const uploader = this.getSlingshotUploader();
    const imageBlob = this.dataURLtoBlob(this.state.finalImage, 'photo');
    let progress = 0;

    this.setState({
      'uploading': true,
      progressBarStyle: {
        width: '0%',
      }
    });

    this.timer = setInterval(() => {
      if(!isNaN(uploader.progress())) {
        progress = Math.ceil(uploader.progress() * 100);
      }

      this.setState({
        progress: progress,
        progressBarStyle: {
          width: progress + '%'
        },
      });

      if (this.state.progress === 100) {
        clearInterval(this.timer);
      }
    }, 100);

    uploader.send(imageBlob, this.handleUpload);
  }

  dataURLtoBlob(dataurl, filename) {
    // from https://stackoverflow.com/questions/28041840/convert-dataurl-to-file-using-javascript

    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);

    while(n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new Blob([u8arr], {type:mime});
  }

  handleUpload(error, url) {
    const caption = this.state.caption;
    const fingerprint = this.state.fingerprint;
    const location = this.state.location;

    if (error) {
      throw new Meteor.Error('upload-file-fail', error);

    } else {

      addPost.call({
        caption,
        photo: url,
        fingerprint,
        location
      }, (err, res) => {
        if (err) {
          console.log(err);
        }

        this.setState({
          'uploading': false
        });

        clearInterval(this.timer);

        Session.set('feedTimestamp', new Date());

        FlowRouter.go('home');

      });

    }
  }

  disableElem() {
    if (this.state.locationChecking || !this.state.locationApproved || this.state.uploading || !this.state.imageReady) {
      return true;
    }

    return false;
  }

  onInputChange(event) {
    this.setState({caption: event.target.value});
  }

  onSubmitForm(event) {
    event.preventDefault();

    if (this.state.locationApproved) {
      this.uploadFile();
    }

    return false;
  }

  render() {
    return (
      <section className="container padding-bottom-small">
        <LocationNotice checking={this.state.locationChecking} approved={this.state.locationApproved} location={this.state.location} unavailable={this.state.locationUnavailable} />

        {this.state.processingImage &&
          <div id="processing-photo-holder" className="grid-row justify-center align-items-center">
            <div id="processing-photo" className="grid-item item-s-12 no-gutter text-align-center font-bold"><span className="animation-phase">Processing...</span></div>
          </div>
        }

        {!this.state.processingImage &&
          <div>
            <div className="grid-row padding-bottom-small">
              <div className="grid-item item-s-12 no-gutter grid-row justify-center align-items-center">
                <img className="post-image" src={this.state.finalImage} />
              </div>
            </div>
            <form onSubmit={this.onSubmitForm}>
              <textarea className="comment-textarea margin-bottom-small" placeholder="Add a caption" value={this.state.caption} onChange={this.onInputChange} />
              <div className="grid-row">
                <div className="grid-item item-s-12 text-align-center">
                  <input className='button font-size-mid' type="submit" value="POST" disabled={this.disableElem()} />
                </div>
              </div>
            </form>
          </div>
        }

        {this.state.uploading &&
          <div id="upload-progress-holder" className="grid-row justify-center align-items-center">
            <div id="upload-progress-bar" style={this.state.progressBarStyle}></div>
            <div className="grid-item item-s-12 no-gutter text-align-center font-bold">{this.state.progress}%</div>
          </div>
        }
      </section>
    );
  }
};
