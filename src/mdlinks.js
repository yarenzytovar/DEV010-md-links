// src/mdlinks.js
const { readFile } = require('fs/promises');
const path = require('path');
const funciones = require('./funcion.js');

async function mdLinks(filePath) {
  try {
    // Resuelve la ruta absoluta
    const absolutePath = path.resolve(filePath);

    // Verifica si la ruta existe
    await funciones.pathExists(absolutePath);

    // Verifica si es un archivo Markdown
    await funciones.isMarkdownFile(absolutePath);

    // Lee el contenido del archivo
    const data = await readFile(absolutePath, 'utf-8');

    // Extrae los enlaces
    const links = funciones.extractLinks(data, absolutePath);

    // Imprime los enlaces
    console.log(links);

    return links;
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}

module.exports = mdLinks;
