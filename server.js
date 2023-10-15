const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const sequelize = require('./config/connection');

const Database = require('./models/Database');
// const Role = require('./models/Role');
// const Employee = require('./models/Employee');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

inquirer
  .prompt([
    {
      type: 'list',
      message: 'What would you like to do?',
      choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit'],
      name:'startmenu'
    }
  ])

app.delete("/api/????/:id", (req, res) => {
  db.query(`DELETE FROM ??? WHERE id = ?`, req.params.id, (err, result) => {
    if (err){
      console.log(err);
    }
    console.log(result);
    res.json(result)
  });
});

  db.query('SELECT * FROM ???', function (err, result) {
  console.log(result);
  });

app.get("/api/???", (req, res) => {
  db.query(`SELECT ??? FROM ???`, function (err, result){
    console.log(result);
    res.json(result)
  });
});

sequelize.sync({ force: true }).then(() =>{ 
  app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})
});