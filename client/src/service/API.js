const parseJSON = (response) => {
  return response.json();
};

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(`HTTP Error ${response.statusText}`);
  error.status = response.statusText;
  error.response = response;
  throw error;
};

const lookup = (query, cb) => {
  return fetch(`api/lookup?q=${query}`)
    .then(checkStatus)
    .then(parseJSON)
    .then(cb);
};

const getTransactions = (issuer, cb) => {
  return fetch(`api/get-transactions?q=${issuer}`)
    .then(checkStatus)
    .then(parseJSON)
    .then(cb);
};

const Api = { lookup, getTransactions };
export default Api;
