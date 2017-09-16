const csv = require('csv');
const TradeRecord = require('../model/TradeRecord');

const parse = (data, cb) => {
  const parseOptions = {
    delimiter: ';',
    columns: true
  };

  csv.parse(data, parseOptions, (err, parsed) => {
    csv.transform(parsed, (data) => new TradeRecord(data), cb);
  });
};

const exportMethods = { parse };
module.exports = exportMethods;
