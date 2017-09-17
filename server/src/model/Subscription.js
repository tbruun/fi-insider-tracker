const uuid = require('uuid/v4');

class Subscription {
  constructor(queryTerm, recipients, id = uuid()) {
    this._id = id;
    this.queryTerm = queryTerm;
    this.recipients = recipients;
  }
}

module.exports = Subscription;