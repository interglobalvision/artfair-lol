/* globals Slingshot Random */
import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';

Slingshot.fileRestrictions('imageUpload', {
  allowedFileTypes: ['image/png', 'image/jpeg', 'image/gif'],
  maxSize: parseInt(Meteor.settings.public.maxUploadSize),
});

// Misc
function createFilename(filename) {
  return Random.id(30);
}

// Server code
if (Meteor.isServer) {

  Slingshot.createDirective('imageUpload', Slingshot.S3Storage, {
    bucket: Meteor.settings.aws_bucket,

    acl: 'public-read',

    authorize() {
      /*
      if (!this.userId) {
        throw new Meteor.Error('not-signed-in', 'You must register a user first before uploading a file.');
      }
      */

      return true;
    },

    key(file) {
      // Store file into an image directory for the user's username.
      return 'images/' + createFilename(file.name);
    },

  });
}
