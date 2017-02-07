import React, { Component } from 'react';

import { distanceFrom } from '/imports/lib/geometry.js';

import sanitizeHtml from 'sanitize-html';

import { addPost } from '/imports/api/photosMethods.js';

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
      locationChecking: true
    };

    this.handleGeolocation = this.handleGeolocation.bind(this);

    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
  }

  componentWillMount() {

    if (!Session.get('geolocation')) {
      navigator.geolocation.getCurrentPosition(this.handleGeolocation);
    }

  }

  handleGeolocation(position) {
    Session.set('geolocationLatitude', position.coords.latitude);
    Session.set('geolocationLongitude', position.coords.longitude);

    this.checkGeofence();
  }

  checkGeofence() {
    let latitude = Session.get('geolocationLatitude');
    let longitude = Session.get('geolocationLongitude');

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

  getSlingshowUploader() {
    return new Slingshot.Upload('imageUpload');
  }

  uploadFile() {
    const uploader = this.getSlingshowUploader();
    const photo = this.state.photo;

    // Use fetch to convert base64 to blob
    fetch(photo)
      .then( res => res.blob() )
      .then( blob => {
        uploader.send(blob, this.handleUpload);
      });
  }

  handleUpload(error, url) {
    const caption = this.state.caption;
    const fingerprint = this.state.fingerprint;

    if (error) {
      console.log(error);
      throw new Meteor.Error('upload-file-fail', error);

    } else {

      addPost.call({
        caption,
        photo: url,
        fingerprint,
      }, (err, res) => {
        if (err) {
          console.log(err);
        }

        FlowRouter.go('home');

      });

    }
  }

  onInputChange(event) {
    this.setState({caption: event.target.value});
  }

  onSubmitForm(event) {
    event.preventDefault();

    this.uploadFile();

    return false;
  }

  render() {
    return (
      <section>
        {this.state.locationChecking &&
          <div className="grid-row margin-bottom-small">
            <div className="grid-item item-s-12 no-gutter grid-row justify-center align-items-center">
              Looking for location...
            </div>
          </div>
        }
        {!this.state.locationChecking && this.state.locationApproved &&
          <div className="grid-row margin-bottom-small">
            <div className="grid-item item-s-12 no-gutter grid-row justify-center align-items-center">
              Approved at: {this.state.location}
            </div>
          </div>
        }
        <div className="grid-row margin-bottom-small">
          <div className="grid-item item-s-12 no-gutter grid-row justify-center align-items-center">
            <img className="post-image" src={this.state.photo} />
          </div>
        </div>
        <form onSubmit={this.onSubmitForm}>
          <textarea className="comment-textarea margin-bottom-small" placeholder="Add a caption" value={this.state.caption} onChange={this.onInputChange} />
          <div className="grid-row margin-bottom-basic">
            <div className="grid-item item-s-12 text-align-center">
              <input className="button font-size-mid" type="submit" value="POST" disabled={this.state.locationApproved} />
            </div>
          </div>
        </form>
      </section>
    );
  }
};
