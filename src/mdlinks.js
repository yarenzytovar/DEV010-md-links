

const { readFile } = require('fs/promises');
const path = require('path');
const funciones = require('/funcion.js');

function mdLinks(filePath) {
  return new Promise((resolve, reject) => {
    // Resuelve la ruta absoluta
    const absolutePath = path.resolve(filePath);

    // Verifica si la ruta existe
    funciones.pathExists(absolutePath)
      .then(() => funciones.isMarkdownFile(absolutePath))
      .then(() => readFile(absolutePath, 'utf-8'))
      .then(data => resolve(funciones.extractLinks(data, absolutePath)))
      .catch(error => reject(error));
  });
}

module.exports = mdLinks;
