const fs = require('fs');
const textIn = fs.readFileSync('txt/input.txt', 'utf-8');
console.log(textIn);
const textOut = `This is introduction of my self: ${textIn}.\n Created on date ${Date.now()}`;
fs.writeFileSync('txt/output.txt', textOut);
console.log('File Written');