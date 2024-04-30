const fs = require('fs');
const http = require('http');
const url = require('url')
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
const server = http.createServer((req, res) => {
  console.log(req.url);
    const pathName = req.url;
    if (pathName === '/' || pathName === '/overview.html') {
      res.end('This is the Home Page');
    } else if (pathName === '/product.html') {
      res.end('This is our Bag');
    } else {
      res.writeHead(404, {
        'Content-type' : 'text/html',
        'my-own-header' : 'Hello World!',
      });
      res.end(`<h1>Page are not Found!</h1>`);
    }
});
server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to request on port 8000')
});