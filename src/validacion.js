const fs = require('fs');
const path = require('path');
const marked = require('marked');
const axios = require('axios');

function extractLinks(markdown, file) {
  const links = [];
  const renderer = new marked.Renderer();

  renderer.link = (href, title, text) => {
    links.push({ href, text, file });
  };

  marked(markdown, { renderer });

  return links;
}

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

function mdLinks(filePath, validate = false) {
  return new Promise((resolve, reject) => {
    const absolutePath = path.resolve(filePath);

    fs.readFile(absolutePath, 'utf8', (readError, data) => {
      if (readError) {
        return reject(readError);
      }

      const links = extractLinks(data, absolutePath);

      if (!validate) {
        return resolve(links);
      }

      const linkPromises = links.map(validateLink);

      Promise.all(linkPromises)
        .then((validatedLinks) => resolve(validatedLinks))
        .catch((validationError) => reject(validationError));
    });
  });
}

module.exports = mdLinks;
