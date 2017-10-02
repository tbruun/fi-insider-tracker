const path = require('path');
const express = require('express');
const insynsRegistretService = require('./service/InsynsRegistretService');
// const databaseService = require('./service/DatabaseService');
const addToFeed = require('./util/rss').addToFeed;
const createFeed = require('./util/rss').createFeed;
const moment = require('moment');

const app = express();
const port = process.env.PORT || 3001;
app.set('port', port);
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
    insynsRegistretService.fetchCsvByIssuer(req.query.q, results => {
      if (results) {
        console.log('returning data from FI web');
        return response.json({results})
      } else {
        return response.status(404).send();
      }
    });
  }
});

app.get('/rss', (req, response) => {
  if (req.query.q.length > 2) {
    insynsRegistretService.fetchCsvByIssuer(req.query.q, results => {
      if (results) {
        console.log('returning data from FI web');
        const feed = createFeed(req.query.q);
        results.forEach(tradeRecord => addToFeed(feed, tradeRecord));
        response.set('Content-Type', 'application/rss+xml');
        response.send(feed.rss2());
      } else {
        return response.status(404).send();
      }
    });
  }
});

app.get('/rss/today', (req, response) => {
  const yesterday = moment().subtract(1, 'days').format('YYYY-MM-DD');
  const tomorrow = moment().add(1, 'days').format('YYYY-MM-DD');
  insynsRegistretService.fetchCsvByDate(yesterday, tomorrow, results => {
    if (results) {
      console.log('returning data from FI web');
      const feed = createFeed(req.query.q);
      results.forEach(tradeRecord => addToFeed(feed, tradeRecord));
      response.set('Content-Type', 'application/rss+xml');
      response.send(feed.rss2());
    } else {
      return response.status(404).send();
    }
  });
});

app.use(express.static(path.join(__dirname, './build')));
app.listen(app.get('port'));
console.log('Server listening to port: ', port);