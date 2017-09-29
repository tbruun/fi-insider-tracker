const Feed = require('feed');
const TradeRecord = require("../model/TradeRecord");

module.exports = {
  createFeed: (title) => {
    return new Feed({
      title: `${title} RSS Feed`,
      description: 'Feed containing updates for FI insider lists',
      id: 'http://example.com/',
      link: 'http://example.com/',
      image: 'http://example.com/image.png',
      favicon: 'http://example.com/favicon.ico',
      copyright: 'All rights reserved 2013, John Doe',
      updated: new Date(), // optional, default = today
      generator: 'fi-insider-tracker', // optional, default = 'Feed for Node.js'
      feedLinks: {
        json: 'https://example.com/json',
        atom: 'https://example.com/atom',
      },
      author: {
        name: 'Thomas Bruun',
        email: 'tbruun@gmail.com',
        link: 'https://github.com/tbruun'
      }
    });
  },

  addToFeed: (feed, tradeRecord) => {
    feed.addItem({
      title: tradeRecord.name,
      id: tradeRecord.id,
      link: 'url',
      custom: 'custom',
      description: 'description',
      content: TradeRecord.stringify(tradeRecord),
      author: [{
        name: tradeRecord.name,
      }],
      contributor: [{
        name: 'Shawn Kemp',
        email: 'shawnkemp@example.com',
        link: 'https://example.com/shawnkemp'
      }, {
        name: 'Reggie Miller',
        email: 'reggiemiller@example.com',
        link: 'https://example.com/reggiemiller'
      }],
      date: tradeRecord.date,
      image: 'img'
    })
  }
};
