
   const myPromise = new Promise((resolve, reject) => {
     // Realiza algún trabajo asincrónico y luego llama a resolve o reject
     // dependiendo del resultado.
     const myAsyncFunction = () => {
        return new Promise((resolve, reject) => {
          // Simulación de trabajo asincrónico con setTimeout
          setTimeout(() => {
            // Después de 2 segundos, resolvemos la promesa
            resolve('Operación asincrónica completada');
          }, 2000);
        });
      };
      
      myAsyncFunction()
        .then((result) => {
          console.log(result); // Se ejecutará después de 2 segundos
        })
        .catch((error) => {
          console.error(error);
        });
      
   });
   
   const path = require('path');
   const absolutePath = path.resolve(relativePath);
   

3. *Comprobar que la ruta existe en el ordenador:*
   Puedes utilizar el módulo `fs` para verificar si la ruta existe. Aquí hay un ejemplo:

   javascript
   const fs = require('fs');
   fs.access(absolutePath, fs.constants.F_OK, (err) => {
     if (err) {
       // La ruta no existe, puedes rechazar la promesa.
     } else {
       // La ruta existe, continúa con el procesamiento.
     }
   });
   

4. *Asegurarse de que el archivo sea Markdown:*
   Puedes verificar la extensión del archivo utilizando el módulo `path`. Aquí hay un ejemplo:

   javascript
   const extname = path.extname(absolutePath);
   if (['.md', '.mkd', '.mdwn', '.mdown', '.mdtxt', '.mdtext', '.markdown', '.text'].includes(extname)) {
     // Es un archivo Markdown, continúa.
   } else {
     // No es un archivo Markdown, puedes rechazar la promesa.
   }
   

5. *Leer un archivo:*
   Utiliza el módulo `fs/promises` para leer el contenido del archivo. Aquí hay un ejemplo:

   javascript
   const fsPromises = require('fs/promises');
const { url } = require('inspector');
   fsPromises.readFile(absolutePath, 'utf-8')
     .then((content) => {
       // Haz algo con el contenido del archivo.
     })
     .catch((err) => {
       // Maneja errores de lectura.
     });
   

6. *Encontrar los enlaces dentro del documento:*
   Para encontrar enlaces en el contenido del archivo Markdown, puedes usar expresiones regulares o una biblioteca como `markdown-it` o `markdown-link-extractor`. Luego, puedes construir un arreglo de objetos con los enlaces.