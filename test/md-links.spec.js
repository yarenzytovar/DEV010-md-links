//mdlinks.spec.js
// Importa las funciones desde mdlinks.js o validacion.js según la estructura real de tu código
const axios = require('axios');
const { mdLinks, extractLinks, validateLink } = require('../src/mdlinks'); 


// Simula Axios para las pruebas
jest.mock('axios');

describe('mdLinks function', () => {
  const mockData = '[Google](http://www.google.com)\n[OpenAI](http://www.openai.com)';

  test('should extract links from the document', async () => {
    const links = await extractLinks(mockData, 'example.md');
    expect(links).toEqual([
      { href: 'http://www.google.com', text: 'Google', file: 'example.md' },
      { href: 'http://www.openai.com', text: 'OpenAI', file: 'example.md' },
    ]);
  });

  test('should validate links using Axios', async () => {
    axios.get.mockResolvedValue({ status: 200 });

    const linkToValidate = { href: 'http://www.google.com', text: 'Google', file: 'example.md' };
    const validateLink = await validateLink(linkToValidate);

    expect(validateLink).toEqual({
      href: 'http://www.google.com',
      text: 'Google',
      file: 'example.md',
      status: 200,
      ok: 'OK',
    });
  });

  test('should handle validation failure using Axios', async () => {
    axios.get.mockRejectedValue({ response: { status: 404 } });

    const linkToValidate = { href: 'http://www.invalidlink.com', text: 'Invalid', file: 'example.md' };
    const validatedLink = await validateLink(linkToValidate);

    expect(validatedLink).toEqual({
      href: 'http://www.invalidlink.com',
      text: 'Invalid',
      file: 'example.md',
      status: 404,
      ok: 'Fail',
    });
  });

  test('should read file, extract links, and optionally validate', async () => {
    axios.get.mockResolvedValue({ status: 200 });

    const links = await mdLinks('example.md', true);

    expect(links).toEqual([
      {
        href: 'http://www.google.com',
        text: 'Google',
        file: 'example.md',
        status: 200,
        ok: 'OK',
      },
      {
        href: 'http://www.openai.com',
        text: 'OpenAI',
        file: 'example.md',
        status: 200,
        ok: 'OK',
      },
    ]);
  });
});
