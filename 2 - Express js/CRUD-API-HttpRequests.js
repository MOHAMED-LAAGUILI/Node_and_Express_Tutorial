const express = require('express');
const app = express();
const port = 3002;

let students = [
  { id: 1, name: "Rahul", age: 20 },
  { id: 2, name: "Rohan", age: 21 },
];

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
  console.log('Root route accessed');
});

app.get('/students', (req, res) => {
  res.json(students);
  console.log('All students retrieved');
});

app.get('/students/:id', (req, res) => {
  const student = students.find(s => s.id === parseInt(req.params.id));
  if (student) {
    res.json(student);
    console.log(`Student with ID ${req.params.id} retrieved`);
  } else {
    res.status(404).send('Student not found');
    console.log(`Student with ID ${req.params.id} not found`);
  }
});

app.post('/createstudent', (req, res) => {
  const newStudent = req.body;
  if (!newStudent.name || !newStudent.age) {
    res.status(400).send('Missing student name or age');
    console.log('Missing student name or age');
  } else {
    newStudent.id = students.length + 1;
    students.push(newStudent);
    res.status(201).json(newStudent);
    console.log(`Student with ID ${newStudent.id} created`);
  }
});

app.put('/updatestudent/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const student = students.find(s => s.id === id);
  if (student) {
    student.name = req.body.name;
    student.age = req.body.age;
    res.status(200).send(`Student with ID ${id} updated successfully.`);
    console.log(`Student with ID ${id} updated successfully`);
  } else {
    res.status(404).send(`Student with ID ${id} not found.`);
    console.log(`Student with ID ${id} not found`);
  }
});

app.delete('/students/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = students.findIndex(s => s.id === id);
  if (index !== -1) {
    students.splice(index, 1);
    res.status(200).send(`Student with ID ${id} deleted successfully.`);
    console.log(`Student with ID ${id} deleted successfully`);
  } else {
    res.status(404).send(`Student with ID ${id} not found.`);
    console.log(`Student with ID ${id} not found`);
  }
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));