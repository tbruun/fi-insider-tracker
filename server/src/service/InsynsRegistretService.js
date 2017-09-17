const fetch = require('node-fetch');
const csvParser = require('./CsvParser');

const parseJSON = (response) => {
  return response.json();
};

const parseCSV = (text) => {
  return new Promise((resolve, reject) => {
    csvParser.parse(text, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  })
};

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(`HTTP Error ${response.statusText}`);
  error.status = response.statusText;
  error.response = response;
  console.log(error);
  throw error;
};

const lookupIssuer = (query, cb) => {
  const options = {method: 'GET', cache: 'default'};
  return fetch(`https://marknadssok.fi.se/Publiceringsklient/sv-SE/AutoComplete/H%C3%A4mtaAutoCompleteLista?sokfunktion=Insyn&sokterm=${query}&falt=Utgivare`, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(res => cb(null, res))
    .catch(err => cb(err));
};

const fetchCsvByIssuer = (issuer, cb) => {
  const options = {method: 'GET', cache: 'default'};
  return fetch(`https://marknadssok.fi.se/publiceringsklient/sv-SE/Search/Search?SearchFunctionType=Insyn&Utgivare=${issuer}&button=export`, options)
    .then(checkStatus)
    .then((res) => res.buffer())
    .then((res) => res.toString('ucs2'))
    .then(parseCSV)
    .then(res => cb(null, res))
    .catch(err => cb(err));
};

const InsynsRegistretService = {lookupIssuer, fetchCsvByIssuer};
module.exports = InsynsRegistretService;
