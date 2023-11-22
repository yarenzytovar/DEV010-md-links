const axios = require('axios');

function validateLink(link) {
  return axios
    .get(link.href)
    .then((response) => ({
      ...link,
      status: response.status,
      ok: response.status >= 200 && response.status < 400 ? 'OK' : 'Fail',
    }))
    .catch((error) => ({
      ...link,
      status: error.response ? error.response.status : 'N/A',
      ok: 'Fail',
    }));
}

module.exports = validateLink;
