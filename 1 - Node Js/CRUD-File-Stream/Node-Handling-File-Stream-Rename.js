const http = require('http');
const fs = require('fs');
const url = require('url');

const hostname = '127.0.0.1';
const port = 3000;


const server = http.createServer((req, res) => {
  fs.rename('file2.txt', 'file1.txt', (err) => {
    if (err) {
      console.log(`Error renaming file: ${err}`);
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Error renaming file');
    } 
      console.log("The file renamed successfully");
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('File renamed successfully');
    
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
