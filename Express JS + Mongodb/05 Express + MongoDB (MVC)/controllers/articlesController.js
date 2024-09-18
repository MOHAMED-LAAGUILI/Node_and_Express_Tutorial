// to use the Article modele here we stock it in varriable
const Article = require("../models/articleSchema");


const articlesShow_index_get = (req, res) => {
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
   }

//-------------------------------------------------------------------
   const articleSave_post= (req, res) => {
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
  }

//-------------------------------------------------------------------
  const articleDetails_details_get= (req, res) => {
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
  }

//-------------------------------------------------------------------
  const articleDelete_delete = (req, res) => {
    Article.findByIdAndDelete(req.params.delById)
    .then((result) => {
     // res.redirect("/");
     res.json({myLink:"/Articles"})
    })
      .catch((err) => {
        console.log(err);
        
      })
    }

module.exports = {
    articlesShow_index_get,
    articleSave_post,
    articleDetails_details_get,
    articleDelete_delete
}