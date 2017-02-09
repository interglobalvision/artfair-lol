/* globals Slingshot Random */
import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';

Slingshot.fileRestrictions('imageUpload', {
  allowedFileTypes: ['image/png', 'image/jpeg'],
  maxSize: parseInt(Meteor.settings.public.maxUploadSize),
});

// Misc
function createFilename() {
  return Random.id(30) + '.jpg';
}

// Server code
if (Meteor.isServer) {

  Slingshot.createDirective('imageUpload', Slingshot.S3Storage, {
    bucket: Meteor.settings.aws_bucket,

    acl: 'public-read',

    cdn: Meteor.settings.AWSCdn,

    authorize() {
      /*
      if (!this.userId) {
        throw new Meteor.Error('not-signed-in', 'You must register a user first before uploading a file.');
      }
      */

      return true;
    },

    key(file) {
      return 'images/' + createFilename();
    },

  });
}
