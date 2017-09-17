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

const addSubscription = (queryTerm, recipient, cb) => {
  const body = {queryTerm, recipient};
  const options = {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(body)
  };

  return fetch('api/add-subscription', options)
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
    .catch(console.log);
};

const Api = { lookup, getTransactions, addSubscription };
export default Api;
