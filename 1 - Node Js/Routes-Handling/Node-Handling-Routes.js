const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = '127.0.0.1';
const port = 3000;

// Define routes and their corresponding file paths
const routes = {
  '/': './index.html',
  '/About': './about.html',
  '/Contact': './contact.html'
};
 // Define content types for different file extensions
 const contentType = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.ts': 'text/typescript'
  };

const server = http.createServer((req, res) => {
  // Determine the file path based on the requested URL
  const filePath = routes[req.url] || './404.html';

  // Get the file extension
  const extname = String(path.extname(filePath)).toLowerCase();

  // Read the file and send the response
  fs.readFile(filePath, (error, content) => {
    if (error) {
      // If there's an error reading the file, send a 500 error
      res.writeHead(500);
      res.end('Server Error: ' + error.code);
    } else {
      // Set the appropriate status code (200 for success, 404 for not found)
      const statusCode = filePath === './404.html' ? 404 : 200;
      // Send the file content with the correct content type
      res.writeHead(statusCode, { 'Content-Type': contentType[extname] || 'text/html' });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
