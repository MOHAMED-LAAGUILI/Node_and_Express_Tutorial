const express = require('express');
const router = express.Router();

// to use the Articles Controller here we stock it in varriable
const articlesController = require('../controllers/articlesController');




//home route + show data from Mongodb to main page
router.get("/", articlesController.articlesShow_index_get); 

   // to handle form submition & save data to mongodb
router.post('/', articlesController.articleSave_post);

// detail article route
router.get("/:IDart", articlesController.articleDetails_details_get); 

  // TO DELETE selected article in details page with button
router.delete('/:delById', articlesController.articleDelete_delete);


module.exports = router