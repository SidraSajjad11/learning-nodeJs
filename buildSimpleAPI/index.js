const fs = require('fs');
const http = require('http');
const url = require('url');
const replaceTemplate = require('./Module/replaceTemplate.js');

const tempOverview = fs.readFileSync(`${__dirname}/nodeFarm/overview.html`, 'utf-8'); 
const tempCard = fs.readFileSync(`${__dirname}/nodeFarm/card.html`, 'utf-8'); 
const tempProduct = fs.readFileSync(`${__dirname}/nodeFarm/product.html`, 'utf-8');  
const data = fs.readFileSync(`${__dirname}/devData/data.json`, 'utf-8'); 
const productData = JSON.parse(data);

const server = http.createServer((req, res) => {
    const { pathname, query } = url.parse(req.url, true);

    // OVERVIEW Page
    if (pathname === '/' || pathname === '/overview') {
        res.writeHead(200, {'Content-type' : 'text/html'});
        const cardsHtml = productData.map(el => replaceTemplate(tempCard, el)).join('');
        const output =  tempOverview.replace('{%PRODUCT_CARD%}', cardsHtml);
        res.end(output);
      
    // PRODUCT PAGE
    } else if (pathname === '/product') {
        res.writeHead(200, {'Content-type' : 'text/html'});
        const productId = query.id;
        const product = productData[productId];
        if (product) {
            const output = replaceTemplate(tempProduct, product);
            res.end(output);
        } else {
            res.writeHead(404, {'Content-type': 'text/html'});
            res.end('<h1>Product not found</h1>');
        }
      
    // API
    } else if (pathname === '/api') {
        res.writeHead(200, {'Content-type' : 'application/json'});
        res.end(data);
      
    // NOT FOUND
    } else {
        res.writeHead(404, {'Content-type' : 'text/html'});
        res.end('<h1>Page not found</h1>');
    }
});

server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to request on port 8000');
});
