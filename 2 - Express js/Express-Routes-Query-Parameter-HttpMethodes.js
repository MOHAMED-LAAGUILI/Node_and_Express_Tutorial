// ---------------------------
// Import and Setup Express
// ---------------------------
// Import the Express framework
const express = require("express");
// Create an instance of an Express application
const app = express();

// ---------------------------
// Import and Setup BrowserSync
// ---------------------------
// Import BrowserSync for live reloading
const { create } = require("browser-sync");
// Create a BrowserSync instance
const browserSync = create();

// ---------------------------
// Define Application Settings
// ---------------------------
// Define the port number for the application
const port = 3000;

// ---------------------------
// Define Routes
// ---------------------------
// Route for the home page
// query => /home?name=mohamed&age=23
app.get("/home", (req, res) => {
  const { name, age } = req.query;
  res.send(`name: ${name} age: ${age}`);
});

// Route for the contact page
// parameters => contact/1
app.get("/Contact/:id", (req, res) => {
    const { id } = req.params;
  res.send(`the parameter values is ${id}`);
});



/*

// Http Requests

// GET: Retrieve data from the server
app.get()
// POST: Send data to the server
app.post()
// PUT: Update data on the server
app.put()
// DELETE: Delete data from the server
app.delete()

*/

// ---------------------------
// Start the Server
// ---------------------------
// Start the server and listen on the defined port
app.listen(port, () => {
  // Start BrowserSync to enable live reloading
  browserSync.init({
    // Set up proxy to the Express app
    proxy: `http://localhost:${port}`,
    // Specify which files to watch for changes to trigger live reload
    files: ["views/**/*.html", "public/**/*.css", "public/**/*.js"],
    // Define the port that BrowserSync will use
   port: 3001, // Port for BrowserSync
 });
  
});
