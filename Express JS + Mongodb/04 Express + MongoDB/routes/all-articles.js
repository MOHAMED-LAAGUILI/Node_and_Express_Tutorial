const express = require('express');
const router = express.Router();
// to use the Article modele here we stock it in varriable
const Article = require("../models/articleSchema");



//home route + show data from Mongodb to main page
router.get("/", (req, res) => {

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
router.post('/', (req, res) => {
     // we store the data that comes from model script Article in a variable const article
     // it stored in req.body
    const article = new Article(req.body);
   
     console.log(req.body);
   
     // save the article & redirect to main page
     article
       .save()
       .then( result => {
         res.redirect("/Articles");
       })
       .catch( err => {
         console.log(err);  
       });
   });
   // detail article route
router.get("/:IDart", (req, res) => {
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
router.delete('/:delById', (req, res) => {
    Article.findByIdAndDelete(req.params.delById)
    .then((result) => {
     // res.redirect("/");
     res.json({myLink:"/Articles"})
    })
      .catch((err) => {
        console.log(err);
        
      })
    });


module.exports = router