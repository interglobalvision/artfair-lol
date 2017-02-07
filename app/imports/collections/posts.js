class PostsCollection extends Mongo.Collection {
  insert(doc, callback) {
    doc.createdAt = doc.createdAt || new Date();
    doc.updatedAt = doc.updatedAt || new Date();
    doc.userId = Meteor.userId();

    return super.insert(doc, callback);
  }

  update(selector, modifier, ...optionsAndCallback) {

    // When modifying whole document (ex. Mongol)
    if (!_.isUndefined(modifier.$set) || !_.isUndefined(modifier.$push) || !_.isUndefined(modifier.$pull)) {
      // When modifying whole document (ex. Mongol)
      modifier['$set']['updatedAt'] = new Date();
    } else {
      modifier['updatedAt'] = new Date();
    }

    return super.update(selector, modifier, ...optionsAndCallback);
  }
};


export const Posts = new PostsCollection('Posts');

Posts.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});
