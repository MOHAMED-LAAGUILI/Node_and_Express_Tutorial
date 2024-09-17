// Import required Node.js modules
const http = require('http');
const fs = require('fs');

// Define server configuration
const hostname = '127.0.0.1'; // localhost
const port = 3000;

// Function to read file contents
function readFile(req, res) {
  // Read 'data.txt' file asynchronously
  fs.readFile('data.txt', 'utf8', (err, data) => {
    if (err) {
      // If there's an error, send a 500 status code
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Error reading file');
    } else {
      // If successful, send the file contents
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(data);
    }
  });
}

// Create HTTP server
const server = http.createServer((req, res) => {
  // Check if the request URL is '/read'
  if (req.url === '/read') {
    readFile(req, res);
  } else {
    // For any other URL, send a 404 Not Found response
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

// Start the server
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
