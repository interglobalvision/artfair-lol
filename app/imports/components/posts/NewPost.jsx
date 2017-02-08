import React, { Component } from 'react';

import 'image-compressor';
import 'whatwg-fetch';

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
    this.resizeImage = this.resizeImage.bind(this);
    this.imageResizedCallback = this.imageResizedCallback.bind(this);

  }

  componentWillMount() {
    navigator.geolocation.getCurrentPosition(this.checkGeofence);
  }

  imageOnLoad(event) {
    let phantomImage = new Image();
    phantomImage.onload = this.resizeImage;
    phantomImage.src = event.target.src;
  }

  resizeImage(event) {
    let imageWidth = event.target.width;
    let imageHeight = event.target.height;

    // If image is larger than maxWidth
    if (imageWidth > Meteor.settings.public.imageCompression.maxWidth) {
      let ratio = Meteor.settings.public.imageCompression.maxWidth / imageWidth;

      let imageCompressor = new ImageCompressor;

      imageCompressor.run(this.state.photo, {
        toWidth: imageWidth * ratio,
        toHeight: imageHeight * ratio,
        mimeType:  Meteor.settings.public.imageCompression.mimeType,
        mode: Meteor.settings.public.imageCompression.mode,
        quality: Meteor.settings.public.imageCompression.quality,
        speed: Meteor.settings.public.imageCompression.speed,
      }, this.imageResizedCallback);
    } else {
      this.setState({
        imageReady: true,
        imageCompressed: this.state.photo,
      });
    }
  }

  imageResizedCallback(img) {
    this.setState({
      imageReady: true,
      imageCompressed: img,
    });

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
    const image = this.state.imageCompressed;

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

    let img = this.dataURLtoFile(image, 'photo');
    uploader.send(img, this.handleUpload);
  }

  dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
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
        <LocationNotice checking={this.state.locationChecking} approved={this.state.locationApproved} location={this.state.location} />

        <div className="grid-row padding-bottom-small">
          <div className="grid-item item-s-12 no-gutter grid-row justify-center align-items-center">
            <img className="post-image" src={this.state.photo} onLoad={this.imageOnLoad} />
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
