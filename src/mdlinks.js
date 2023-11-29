//mdlinks.js
const axios = require('axios');
const fs = require('fs');
const path = require('path');

function extractLinks(data, filePath) {
  const links = [];
  const linkRegex = /\[([^\]]*)\]\(([^)]*)\)/g;
  let match;

  while ((match = linkRegex.exec(data)) !== null) {
    links.push({
      href: match[2],
      text: match[1],
      file: filePath,
    });
  }

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
    .catch((error) => {
      /*console.error(`Error validating link: ${link.href}`);
      console.error(error);*/
      return {
        ...link,
        status: error.response ? error.response.status : 400,
        ok: 'Fail',
      };
    });
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

module.exports = {mdLinks, extractLinks, validateLink}

