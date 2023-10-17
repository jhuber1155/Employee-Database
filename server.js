const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');
import { viewEmployees } from './asyncfunctions';
import { addEmployee } from './asyncfunctions';
import { updateEmployee } from './asyncfunctions';
import { viewRoles } from './asyncfunctions';
import { viewDepartments } from './asyncfunctions';
import { addDepartment } from './asyncfunctions';
import { quit } from './asyncfunctions';

const functions = [
  { name: "View All Employees", value: viewEmployees()},
  { name: "Add Employee", value: addEmployee()},
  { name: "Update Employee Role", value: updateEmployee()},
  { name: "View All Roles", value: viewRoles()},
  { name: "View All Departments", value: viewDepartments()},
  { name: "Add Department", value: addDepartment()},
  { name: "Quit", value: quit()}
];

const PORT = process.env.PORT || 3001;
const app = express();

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'SQLPassword1!',
    database: 'employees_db'
  },
  console.log(`Connected to the employees_db database.`)
);

startmenu =[
  inquirer
    .prompt([
      {
        name: 'menu',
        type: 'list',
        message: 'What would you like to do?',
        choices: functions
      }
    ])
]

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });