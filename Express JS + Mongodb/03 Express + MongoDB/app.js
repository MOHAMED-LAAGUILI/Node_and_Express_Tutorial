const express = require("express");
const app = express();
const port = 3000;

// to import the engine to EJS (Template Engine)
app.set("view engine", "ejs");
// to import & call folder of the public where we store images, css & js   file
app.use(express.static("public"));
// to send a post request fom form you nedd to add these
app.use(express.urlencoded({ extended: true })); // to avoid undefiend entry data of form post
// to use the Article modele here we stock it in varriable
const Article = require("./models/articleSchema");

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
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

  })
  .catch((err) => {
    console.log(err);
  });

// routes
// rederect to home route
app.get("/", (req, res) => {
  res.redirect("/all-articles");
});

// add article route
app.get("/add-new-article", (req, res) => {
  res.render("add-new-article.ejs",{mytitle: "Add Articles"});
});

/*
//home route
app.get("/all-articles", (req, res) => {
  res.render("index.ejs",{mytitle: "Home"});
});
*/

//home route + show data from Mongodb to main page
app.get("/all-articles", (req, res) => {

  // Article here is the varible up here that require the schema file
  //this return array
   Article
    .find()
    .then((result) => {
       res.render("index.ejs", { mytitle: "HOME", arrArticle : result});
     })
     .catch((err) => {
       console.log(err);
     });
 }); 
 // to handle form submition & save data to mongodb
 app.post('/all-articles', (req, res) => {
   // we store the data that comes from model script Article in a variable const article
   // it stored in req.body
  const article = new Article(req.body);
 
   console.log(req.body);
 
   // save the article & redirect to main page
   article
     .save()
     .then( result => {
       res.redirect("/all-articles");
     })
     .catch( err => {
       console.log(err);  
     });
 });
 // detail article route
 app.get("/all-articles/:IDart", (req, res) => {

  // show article by selected ID
  // this return a single object of an array
  Article
  .findById(req.params.IDart)
  .then((result) => {
     res.render("article-detailes.ejs", { mytitle: "Article Detailes", objArticle : result});
   })
   .catch((err) => {
     console.log(err);
   });
}); 
// TO DELETE selected article in details page with button
app.delete('/all-articles/:delById', (req, res) => {
  Article.findByIdAndDelete(req.params.delById)
  .then((result) => {
   // res.redirect("/");
   res.json({myLink:"/all-articles"})
  })
    .catch((err) => {
      console.log(err);
      
    })
  });






// to handle 404 request to a page of files that doesn't exist
app.use((req, res, next) => {
  res.status(404).render("404.ejs",{mytitle: "404 page not found"});
});

