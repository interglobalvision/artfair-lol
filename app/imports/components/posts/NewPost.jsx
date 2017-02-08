import React, { Component } from 'react';

import Hermite from '/imports/lib/hermite.js';
import { distanceFrom } from '/imports/lib/geometry.js';

import sanitizeHtml from 'sanitize-html';

import { addPost } from '/imports/api/photosMethods.js';

import { LocationNotice } from '/imports/components/posts/LocationNotice.jsx';

export class NewPost extends Component {
  constructor(props) {
    super(props);

    let photo = Session.get('newPhoto');
    let fingerprint = Session.get('fingerprint');

    if(photo === undefined) {
      FlowRouter.go('home');
    }

    this.state = {
      photo,
      fingerprint,
      locationApproved: false,
      locationChecking: true,
      imageReady: false,
      uploading: false
    };

    this.checkGeofence = this.checkGeofence.bind(this);

    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.imageOnLoad = this.imageOnLoad.bind(this);

    this.toBlobPolyfill();
  }

  toBlobPolyfill() {
    if (!HTMLCanvasElement.prototype.toBlob) {
      Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
        value: function (callback, type, quality) {

          var binStr = atob( this.toDataURL(type, quality).split(',')[1] ),
            len = binStr.length,
            arr = new Uint8Array(len);

          for (var i = 0; i < len; i++ ) {
            arr[i] = binStr.charCodeAt(i);
          }

          callback( new Blob( [arr], {type: type || 'image/png'} ) );
        }
      });
    }
  }

  componentWillMount() {
    navigator.geolocation.getCurrentPosition(this.checkGeofence);
  }

  imageOnLoad(event) {
    let img = new Image;
    img.onload = this.resizeImage.bind(this);
    img.src = this.state.photo;
  }

  resizeImage(event) {
    let imageWidth = event.target.width;
    let imageHeight = event.target.height;

    let canvas = this.canvas;
    let ctx = canvas.getContext('2d');

    canvas.width = imageWidth;
    canvas.height = imageHeight;

    ctx.drawImage(event.target, 0, 0);

    if (imageWidth > Meteor.settings.public.maxImageWidth) {
      let ratio = Meteor.settings.public.maxImageWidth / imageWidth;
      let hermite = new Hermite();

      hermite.resample(canvas, imageWidth * ratio, imageHeight * ratio, true, this.imageResizedCallback.bind(this));

    } else {
      this.setState({
        'imageReady': true
      });
    }

  }

  imageResizedCallback() {

    this.setState({
      'imageReady': true
    });

  }

  checkGeofence(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    let fenceMatch = _.find(Meteor.settings.public.geofences, function(fence) {
      let distance = distanceFrom({
        'lat1': latitude,
        'lng1': longitude,
        'lat2': fence.latitude,
        'lng2': fence.longitude
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
    const photo = this.state.photo;

    this.setState({
      'uploading': true,
      progressBarStyle: {
        width: '0%',
      }
    });

    let progress = 0;

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

    // Use fetch to convert base64 to blob
    let canvas = this.canvas;

    canvas.toBlob( blob => {
      uploader.send(blob, this.handleUpload);
    });
  }

  handleUpload(error, url) {
    const caption = this.state.caption;
    const fingerprint = this.state.fingerprint;
    const location = this.state.location;

    if (error) {
      console.log(error);
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
        <LocationNotice checking={this.state.locationChecking} approved={this.state.locationApproved} location={this.state.location} />

        <div className="grid-row padding-bottom-small">
          <div className="grid-item item-s-12 no-gutter grid-row justify-center align-items-center">
            <img className="post-image" src={this.state.photo} onLoad={this.imageOnLoad} />
            <canvas id="image-canvas" style={{display: "none"}} ref={canvas => this.canvas = canvas}></canvas>
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
