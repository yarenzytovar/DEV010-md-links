const mdLinks = require('./src/mdlinks');

mdLinks('src/example/ejemplos.md') 
  .then((links) => {
    console.log(links);
  })
  .catch(console.error);

mdLinks('src/example/ejemplos.md', true)
  .then((links) => {
    console.log(links);
  })
  .catch(console.error);

mdLinks('src/example/ejemplos.md', false)
  .then((links) => {
    console.log(links);
  })
  .catch(console.error);
