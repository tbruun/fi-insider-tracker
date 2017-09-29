const express = require('express');
const insynsRegistretService = require('./service/InsynsRegistretService');
const databaseService = require('./service/DatabaseService');
const addToFeed = require('./util/rss').addToFeed;
const createFeed = require('./util/rss').createFeed;

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

app.get('/api/get-transactions', (req, response) => {
  if (req.query.q.length > 2) {
    databaseService.findByIssuer(req.query.q, (err, res) => {
      if (err) {
        console.log('Error lookng up issuer from database', err);
        throw err;
      }
      if (res && res.length > 0) {
        console.log(`returning ${res.length} records from database`);
        response.json({results: res})
       } else {
        insynsRegistretService.fetchCsvByIssuer(req.query.q, results => {
          if (results) {
            console.log(`saving ${results.length} records to database`);
            results.forEach((record) => {
              databaseService.save(record);
            });
            console.log('returning data from FI web');
            return response.json({results})
          } else {
            return response.status(404).send();
          }
        });
      }
    });
  }
});

app.get('/api/get-transactions/rss', (req, response) => {
  if (req.query.q.length > 2) {
    databaseService.findByIssuer(req.query.q, (err, res) => {
      if (err) {
        console.log('Error lookng up issuer from database', err);
        throw err;
      }
      if (res && res.length > 0) {
        console.log(`returning ${res.length} records from database`);
        const feed = createFeed(req.query.q);
        res.forEach(tradeRecord => addToFeed(feed, tradeRecord));
        response.set('Content-Type', 'application/rss+xml');
        response.send(feed.rss2());
       } else {
        insynsRegistretService.fetchCsvByIssuer(req.query.q, results => {
          if (results) {
            console.log(`saving ${results.length} records to database`);
            results.forEach((record) => {
              databaseService.save(record);
            });
            console.log('returning data from FI web');
            return response.json({results})
          } else {
            return response.status(404).send();
          }
        });
      }
    });
  }
});

app.listen(app.get('port'));
