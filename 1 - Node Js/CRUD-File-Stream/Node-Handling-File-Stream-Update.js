const http = require('http');
const fs = require('fs');
const url = require('url');

const hostname = '127.0.0.1';
const port = 3000;


const server = http.createServer((req, res) => {
  fs.appendFile('file1.txt', '\n added content', (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('New content added to file');
    }
  });
});


server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
