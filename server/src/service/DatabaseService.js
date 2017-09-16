const mongojs = require('mongojs');
const db = mongojs('insynsregistret', ['records']);
const records = db.collection('records');

const save = (record) => {
  records.save(record);
};

const findByIssuer = (issuer, cb) => {
  records.find({ issuer: new RegExp(issuer, 'i') }).toArray(cb);
};

const DatabaseService = { save, findByIssuer };
module.exports = DatabaseService;
