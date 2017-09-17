const mongojs = require('mongojs');
const db = mongojs('insynsregistret', ['records']);
const Subscription = require('../model/Subscription');
const records = db.collection('records');
const subscriptions = db.collection('subscriptions');

const save = (record) => {
  records.save(record);
};

const findByIssuer = (issuer, cb) => {
  records.find({ issuer: new RegExp(issuer, 'i') }).toArray(cb);
};

const addSubscription = (queryTerm, recipient, cb) => {
  const cbHandler = (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, {_id: res._id});
    }
  };

  subscriptions.find({ queryTerm: new RegExp(queryTerm, 'i')}).toArray((err, res) => {
    if (res.length === 0) {
      subscriptions.save(new Subscription(queryTerm, [recipient]), cbHandler);
    } else if (res.length === 1) {
      const subscription = res[0];
      const recipients = subscription.recipients.concat(recipient);
      subscriptions.save(new Subscription(queryTerm, recipients, subscription._id), cbHandler)
    } else if (err) {
      throw err;
    } else {
      throw new Error(`Cannot add subscription with queryterm that produces multiple results. Query: ${queryTerm}`)
    }
  });
};

const DatabaseService = { save, findByIssuer, addSubscription };
module.exports = DatabaseService;
