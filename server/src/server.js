const express = require('express');
var bodyParser = require('body-parser');
const insynsRegistretService = require('./service/InsynsRegistretService');
const databaseService = require('./service/DatabaseService');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('port', (process.env.PORT || 3001));
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('../client/build'));
}

app.get('/api/lookup', (req, res) => {
  if (req.query.q.length > 2) {
    insynsRegistretService.lookupIssuer(req.query.q, (err, results) => {
      if (err) {
        res.status(599).send();
      } else {
        res.json({ results })
      }
    });
  }
});

app.get('/api/get-transactions', (req, response) => {
  if (req.query.q.length > 2) {
    insynsRegistretService.fetchCsvByIssuer(req.query.q, (err, results) => {
      if (err) {
        console.log('error...', err);
        return response.status(599).send();
      }
      if (results) {
        console.log(`returning ${results.length} records from FI web`);
        return response.json({results})
      } else {
        return response.status(404).send();
      }
    });
  }
});

app.post('/api/add-subscription', (req, response) => {
  const queryTerm = req.body.queryTerm;
  const recipient = req.body.recipient;
  if (!queryTerm || !recipient) {
    response.status(400).send();
    return;
  }
  databaseService.addSubscription(queryTerm, recipient, (err, res) => {
    if (err) {
      response.status(500).send();
    } else {
      response.json(res);
    }
  });
});

app.listen(app.get('port'));
