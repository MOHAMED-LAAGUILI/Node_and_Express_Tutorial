const http = require('http');
const fs = require('fs');
const url = require('url');

const hostname = '127.0.0.1';
const port = 3000;


const server = http.createServer((req, res) => {

// Delete file
  fs.unlink('file2.txt',(err) => {
    if (err) {
      throw err
    } else {
// Log information
console.log("File Deleted");
// Log warnings
console.warn("File Deleted");
// Log errors
console.error("File Deleted");


     }

  });



  //Delete Directory

  fs.rmdir('folder01', (err) => {
    if (err) {
      throw err
    } else {
// Log information
console.log("Directory Deleted");
// Log warnings
console.warn("Directory Deleted");
// Log errors
console.error("Directory Deleted");
    }
});
})


server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
