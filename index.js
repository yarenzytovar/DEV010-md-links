// index.js

const mdLinks = require('./src/mdlinks');


mdLinks('./some/example.md')
  .then(links => {
    console.log(links);
  })
  .catch(console.error);
