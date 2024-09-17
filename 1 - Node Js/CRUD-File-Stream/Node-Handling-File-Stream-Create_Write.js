const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  const folderName = 'folder1';
  const fileName = 'file2.txt';
  const filePath = path.join(folderName, fileName);

  fs.mkdir(folderName, (mkdirErr) => {
    if (mkdirErr) {
      console.log(mkdirErr);
      res.statusCode = 500;
      res.end("Error creating folder");
    } else {
      console.log('Folder created');
      
      fs.writeFile(filePath, 'New text file', (writeErr) => {
        if (writeErr) {
          console.log(writeErr);
          res.statusCode = 500;
          res.end("Error creating file");
        } else {
          console.log('File created and data added successfully');
          res.statusCode = 200;
          res.end("Folder and file created successfully");
        }
      });
    }
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
