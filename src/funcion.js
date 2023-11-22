const { existsSync, readdirSync } = require('fs');
const path = require('path');
const marked = require('marked');

function pathExists(filePath) {
  return new Promise((resolve, reject) => {
    existsSync(filePath) ? resolve() : reject(`La ruta '${filePath}' no existe.`);
  });
}

function isMarkdownFile(filePath) {
  const validExtensions = ['.md', '.mkd', '.mdwn', '.mdown', '.mdtxt', '.mdtext', '.markdown', '.text'];
  const fileExtension = path.extname(filePath);

  return validExtensions.includes(fileExtension)
    ? Promise.resolve()
    : Promise.reject(`El archivo '${filePath}' no es de tipo Markdown.`);
}

function extractLinks(data, filePath) {
  const links = [];
  const renderer = new marked.Renderer();

  // Custom renderer to extract links
  renderer.link = (href, title, text) => {
    links.push({ href, text, file: filePath });
  };

  marked(data, { renderer });

  return links;
}

module.exports = { pathExists, isMarkdownFile, extractLinks };
