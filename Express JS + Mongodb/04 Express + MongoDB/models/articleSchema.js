
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
 
// define the Schema (the structure of the article)
const articleSchema = new Schema({
  // the key must be like the nema attribut in form
  // to avoid confusion
  // key : value
  title: String,
  summary: String,
  body: String,
});
 
 
// Create a model based on that schema
const Article = mongoose.model("Article", articleSchema);
 
 
// export the model 
module.exports = Article; 