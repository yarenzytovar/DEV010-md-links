
const fs = require('fs');
const path = require('path');

function mdLinks(filePath) {
  return new Promise((resolve, reject) => {
    // Transforma la ruta a absoluta
    const absolutePath = path.resolve(filePath);

    // Comprueba que la ruta existe
    if (!fs.existsSync(absolutePath)) {
      reject(`La ruta '${absolutePath}' no existe.`);
      return;
    }

    // Asegúrate de que el archivo sea Markdown
    const validExtensions = ['.md', '.mkd', '.mdwn', '.mdown', '.mdtxt', '.mdtext', '.markdown', '.text'];
    const fileExtension = path.extname(absolutePath);

    if (!validExtensions.includes(fileExtension)) {
      reject(`El archivo '${absolutePath}' no es de tipo Markdown.`);
      return;
    }

    // Lee el archivo
    fs.readFile(absolutePath, 'utf-8', (err, data) => {
      if (err) {
        reject(`Error al leer el archivo '${absolutePath}': ${err.message}`);
        return;
      }

      // Encuentra los enlaces con una expresión regular
      const linkRegex = /\[([^\]]*)\]\(([^)]*)\)/g;
      const links = [];
      let match;

      while ((match = linkRegex.exec(data)) !== null) {
        links.push({
          text: match[1],
          href: match[2],
          file: absolutePath,
        });
      }

      resolve(links);
    });
  });
}

// Ejemplo de uso:
mdLinks('example/ejemplos.md')
  .then((links) => {
    console.log(links);
  })
  .catch((error) => {
    console.error('Error:', error);
  });

module.exports = mdLinks;
