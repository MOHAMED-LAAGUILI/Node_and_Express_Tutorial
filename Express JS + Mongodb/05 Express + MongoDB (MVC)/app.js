const express = require("express");
const app = express();
const port = 3000;
// to secure our data before hosting e use the helmet package
const helmet = require("helmet");

// to import the engine to EJS (Template Engine)
app.set("view engine", "ejs");
// to import & call folder of the public where we store images, css & js   file
app.use(express.static("public"));
// to send a post request fom form you nedd to add these
app.use(express.urlencoded({ extended: true })); // to avoid undefiend entry data of form post
// import of routes folder
const allArticlesRoutes= require("./routes/all-articles.js");


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

// Mongoose
// is a package that connect with MongoDB
const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://mohamed:mohamed2023@cluster0.wqkwsr3.mongodb.net/mydb?retryWrites=true&w=majority")
.then((result) => {
app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

  })
  .catch((err) => {
    console.log(err);
  });

// to secure our data before hosting we use the helmet package
app.use(helmet());


// routes
// rederect to home route
app.get("/", (req, res) => {
  res.redirect("/Articles");
});

// add article route
app.get("/add-new-article", (req, res) => {
  res.render("add-new-article.ejs",{mytitle: "Add Articles"});
});



// to use all imported routes
app.use("/Articles",allArticlesRoutes);




// to handle 404 request to a page of files that doesn't exist
app.use((req, res, next) => {
  res.status(404).render("404.ejs",{mytitle: "404 page not found"});
});

