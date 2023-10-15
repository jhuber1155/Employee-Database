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

const startmenu = [
  { name: "View All Employees", value: viewEmployees()},
  { name: "Add Employee", value: addEmployee()},
  { name: "Update Employee Role", value: updateEmployee()},
  { name: "View All Roles", value: viewAllRoles()},
  { name: "Add Role", value: addRole()},
  { name: "View All Deparments", value: viewAllDeparments()},
  { name: "Add Department", value: addDepartment()},
  { name: "Quit", value: quit()}
];

inquirer
  .prompt([
    {
      name:'menu',
      type: 'list',
      message: 'What would you like to do?',
      choices: startmenu,
      validate: function(input) {
        if (input === "") {
          return "You must select an option";
        }
        return true;
      }
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