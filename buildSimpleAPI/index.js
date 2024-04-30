const fs = require('fs');
const http = require('http');
const url = require('url');
const replaceTemplate = require('./Module/replaceTemplate.js');
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// File System
// const textIn = fs.readFileSync('txt/input.txt', 'utf-8');
// console.log(textIn);
// const textOut = `This is introduction of my self: ${textIn}.\n Created on date ${Date.now()}`;
// fs.writeFileSync('txt/output.txt', textOut);
// console.log('File Written');
// Asynchronous Way
// fs.readFile('../txt/start.txt', 'utf-8', (err, data1) => {
//   if (err) return console.log('Error!💢')
//   fs.readFile(`../txt/${data1}.txt`, 'utf-8', (err, data2) => {
//     // console.log(err)
//     console.log(data2);
//     fs.readFile(`../txt/append.txt`, 'utf-8', (err, data3) => {
//       // console.log(err)
//       console.log(data3);
//       fs.writeFile(`./txt/final.txt`, `${data2}\n${data3}`, 'utf-8', err => {
//         console.log('Your file has been written 😃.')
//       })
//     });
//   });
// });
// console.log('Will read File!');


/////////////////////////////////////////////////////////// Server
const tempOverview = fs.readFileSync(`${__dirname}/nodeFarm/overview.html`, 'utf-8'); 
const tempCard = fs.readFileSync(`${__dirname}/nodeFarm/card.html`, 'utf-8'); 
const tempProduct = fs.readFileSync(`${__dirname}/nodeFarm/product.html`, 'utf-8');  
const data = fs.readFileSync(`${__dirname}/devData/data.json`, 'utf-8'); 
console.log(tempOverview);
console.log(tempCard);
console.log(tempProduct);
console.log(data);
console.log(`${__dirname}`);
const productData = JSON.parse(data);
const server = http.createServer((req, res) => {
      const {query, pathName} = url.parse(req.url, true);
    // OVERVIEW Page
    if (pathName === '/' || pathName === '/overview') {
      res.writeHead(200, {'Content-type' : 'text/html'});
      const cardsHtml = productData.map(el => replaceTemplate(tempCard, el)).join('');
      const output =  tempOverview.replace('{%PRODUCT_CARD%}', cardsHtml);
      res.end(output);
      
      // PRODUCT PAGE
    } else if (pathName === '/product') {
      res.writeHead(200, {'Content-type' : 'text/html'});
      const product = productData[query.id];
      const output = replaceTemplate(tempProduct, product);
      res.end(output);
      // API
    } else if (pathName === '/api') {
      res.writeHead(200, {
        'Content-type' : 'application/json',
      });
      res.end(data);
      // NOT FOUND
    } else {
      res.writeHead(404, {
        'Content-type' : 'text/html',
        'my-own-header' : 'Hello World!',
      });
      res.end(`<h1>Page are not Found!</h1>`);
    }
});
server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to request on port 8000');

});
 