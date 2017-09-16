const insynsRegistretService = require('../src/service/InsynsRegistretService');

test.skip('test', (done) => {
  insynsRegistretService.fetchCsvBylookupIssuer('Maxkompetens', (res) => {
    console.log('res', res);
    done();
  });
});