// index.js

const mdLinks = require('./src/mdLinks');

mdLinks('example/ejemplos.md')
  .then((links) => {
    console.log(links);
  })
  .catch(console.error);

mdLinks('example/ejemplos.md', true)
  .then((links) => {
    console.log(links);
  })
  .catch(console.error);

mdLinks('example/ejemplos.md', false)
  .then((links) => {
    console.log(links);
  })
  .catch(console.error);
