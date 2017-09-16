const CsvParser = require('../src/service/CsvParser');
const fs = require('fs');

test('test', (done) => {
  fs.readFile('./test/Insyn2017-09-16.csv', 'ucs2', (err, data) => {
    CsvParser.parse(data, (err, data) => {
      const test = data[0];
      expect(test.name).toBe('Mikael Norberg');
      expect(test.issuer).toBe('Maxkompetens Sverige AB');
      expect(test.transaction.volume).toBe('2000');
      data.forEach(record => expect(record.issuer.toLowerCase()).toBe('maxkompetens sverige ab'))
      done();
    })
  });
});