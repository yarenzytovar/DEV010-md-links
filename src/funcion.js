
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

  console.log(`Checking file extension for ${filePath}: ${fileExtension}`);

  const isMarkdown = validExtensions.includes(fileExtension);
  if (!isMarkdown) {
    console.log(`El archivo '${filePath}' no es de tipo Markdown.`);
  }

  return isMarkdown ? Promise.resolve() : Promise.reject(`El archivo '${filePath}' no es de tipo Markdown.`);
}

function extractLinks(data, filePath) {
  const links = [];
  const tokens = marked.lexer(data);

  // Custom renderer to extract links
  tokens.forEach((token) => {
    if (token.type === 'link') {
      links.push({
        href: token.href,
        text: token.text,
        file: filePath,
      });
    }
  });

  return links;
}

module.exports = { pathExists, isMarkdownFile, extractLinks };
