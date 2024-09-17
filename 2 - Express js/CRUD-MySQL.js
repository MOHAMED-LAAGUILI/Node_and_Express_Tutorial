const express = require('express');
const app = express();
const port = 3010;

const mysql = require('mysql');

// Create a MySQL connection
const db__connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'express-db1'
});

// Connect to the database
db__connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

let students = [];

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
  console.log('Root route accessed');
});

app.get('/students', (req, res) => {
  const sql = `SELECT * FROM students`;
  
    db__connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error retrieving students:', err);
      res.status(500).send('Error retrieving students');
    } else {
      res.json(results);
      console.log('All students retrieved');
    }
  });
});

app.get('/students/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const sql = `SELECT * FROM students WHERE id = ${id}`;

  db__connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error retrieving student:', err);
      res.status(404).send('Student not found');
    } else {
      res.json(results[0]);
      console.log(`Student with ID ${id} retrieved`);
    }
  });
});

app.post('/createstudent', (req, res) => {
  const newStudent = req.body;
  const sql =`INSERT INTO students SET ${newStudent}`;

  db__connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error creating student:', err);
      res.status(400).send('Error creating student');
    } else {
      res.status(201).json(newStudent);
      console.log(`Student with ID ${newStudent.id} created`);
    }
  });
});

app.put('/updatestudent/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updates = req.body;
  const sql = `'UPDATE students SET ${updates} WHERE id = ${id}`;

  db__connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error updating student:', err);
      res.status(404).send('Student not found');
    } else {
      res.status(200).send(`Student with ID ${id} updated successfully.`);
      console.log(`Student with ID ${id} updated successfully`);
    }
  });
});

app.delete('/students/:id', (req, res) => {
  const id = parseInt(req.params.id);
const sql = `DELETE FROM students WHERE id = ${id}`;

  db__connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error deleting student:', err);
      res.status(404).send('Student not found');
    } else {
      res.status(200).send(`Student with ID ${id} deleted successfully.`);
      console.log(`Student with ID ${id} deleted successfully`);
    }
  });
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));