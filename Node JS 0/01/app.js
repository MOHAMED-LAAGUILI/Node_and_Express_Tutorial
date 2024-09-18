const express = require('express');
const app = express();
const port = 3000;


// CRUD

//Create
app.post('/add',(req, rep) => {
  console.log('add work');
  
})

// Read
app.get('/getall',(req, rep) => {
    console.log('add work');
})

// Update
app.put('/update',(req, rep) => {
    console.log('update work'); 
})

// Delete
app.delete('/delete',(req, rep) => {
    console.log('delete work');
})


app.listen(port,(params) => {
    console.log(`http://localhost:${port}`);
    
});