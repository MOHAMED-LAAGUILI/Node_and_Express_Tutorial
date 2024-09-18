const express = require("express");
const app = express();
const port = 3000;

// to import the engine to EJS (Template Engine)
app.set("view engine", "ejs");
// to import & call folder of the public where we store images, css & js   file
app.use(express.static("public"));

// for auto refresh & live reload
const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, "public"));
const connectLivereload = require("connect-livereload");
app.use(connectLivereload());
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

app.get("/", (req, res) => {
  res.redirect("/all-articles");
});

app.get("/all-articles", (req, res) => {
  res.render("index.ejs");
});

app.get("/add-new-article", (req, res) => {
  res.render("add-new-article.ejs");
});

// to handle 404 request to a page of files that doesn't exist
app.use((req, res, next) => {
  res.status(404).send("Sorry, can't find that!");
});

// start the server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
