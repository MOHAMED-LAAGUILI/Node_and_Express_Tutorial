const express = require('express');
const app = express();
const port = 3000;

// to import & call folder of the public where we store images, css & js   file
app.use(express.static('public'));

// to import the engine to EJS (Template Engine)
app.set('view engine', 'ejs');


// main route
app.get('/', (req, res) => {
  res.send(`
    <h1>Hello</h1>
    <h1>Hello</h1>
  `);
});

// another route
app.get('/about', (req, res) => {
  res.send(`
    <h1>about</h1>
  `);
});

// REDIRECTING to other pages
app.get('/contact', (req, res) => {
  res.redirect('/contactError');
});

app.get('/contactError', (req, res) => {
  res.send('Contact page');
});

// open a file
app.get('/main', (req, res) => {
  // for html file
  //res.sendFile('index.ejs', { root: __dirname + '/views' });

  // for ejs file
  res.render('index.ejs'); // render automaticly by default runs the view folder
});

// to handle 404 request to a page that doesn't exist
app.use((req, res, next) => {
  res.status(404).send("Sorry, can't find that!");
});

// start the server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
