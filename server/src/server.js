const express = require('express');
const insynsRegistretService = require('./service/InsynsRegistretService');

const app = express();
app.set('port', (process.env.PORT || 3001));
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('../client/build'));
}

app.get('/api/lookup', (req, res) => {
  if (req.query.q.length > 2) {
    insynsRegistretService.lookupIssuer(req.query.q, results => res.json({ results }));
  }
});

app.get('/api/get-transactions', (req, res) => {
  if (req.query.q.length > 2) {
    insynsRegistretService.fetchCsvByIssuer(req.query.q, results => res.json({results}));
  }
});

app.listen(app.get('port'));
