const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');
// import { viewEmployees } from './asyncfunctions';
// import { viewEmployeeManager } from './asyncfunctions';
// import { addEmployee } from './asyncfunctions';
// import { updateEmployee } from './asyncfunctions';
// import { updateManager } from './asyncfunctions';
// import { viewRoles } from './asyncfunctions';
// import { viewDepartments } from './asyncfunctions';
// import { addDepartment } from './asyncfunctions';
// import { quit } from './asyncfunctions';

// const functions = [
//   { name: "View All Employees", value: viewEmployees },
//   { name: "Add Employee", value: addEmployee },
//   { name: "Update Employee Role", value: updateEmployee },
//   { name: "Update Manager Role", value: updateManager},
//   { name: "View All Roles", value: viewRoles },
//   { name: "View All Departments", value: viewDepartments },
//   { name: "Add Department", value: addDepartment },
//   { name: "View Managers", value: viewEmployeeManager},
//   { name: "Quit", value: quit },
// ];


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

// startmenu =[
//   inquirer
//     .prompt([
//       {
//         name: 'menu',
//         type: 'list',
//         message: 'What would you like to do?',
//         choices: functions
//       }
//     ])
// ]
async function viewRoles() {
  return new Promise((resolve, reject) => {
    db.query('SELECT r.id AS id, r.title AS title, r.salary AS salary, d.name AS department FROM role r JOIN department d ON r.department_id = d.id;', function (err, results) {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

async function viewEmployeeManager() {
  return new Promise((resolve, reject) => {
    db.query('SELECT e.id AS id, e.first_name AS first_name, e.last_name AS last_name, r.title AS title FROM employee e JOIN role r ON e.role_id = r.id WHERE manager_id IS null;', function (err, results) {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}


async function addEmployee() {
  const title = [];
  const roles = await viewRoles();
  for (let i = 0; i < roles.length; i++) {
    title.push({ name: roles[i].title, value: roles[i].id });
  }

  const manager = [];
  const managers = await viewEmployeeManager();
  for (let i = 0; i < managers.length; i++) {
    manager.push({ name: managers[i].manager, value: managers[i].id });
  }

  inquirer
    .prompt([
      {
        name: 'first_name',
        type: 'input',
        message: 'What is the employee\'s first name?',
      },
      {
        name: 'last_name',
        type: 'input',
        message: 'What is the employee\'s last name?',
      },
      {
        name: 'role_id',
        type: 'list',
        message: 'What is their role?',
        choices: title,
      },
      {
        name: 'manager_id',
        type: 'list',
        message: 'What is the employee\'s manager id number?',
        choices: manager,
      },
    ])
    .then((data) => {
      const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
      const params = [data.first_name, data.last_name, data.role_id, data.manager_id];
      db.query(sql, params, (err, result) => {
        if (err) {
          console.log(err);
          return;
        }
        console.table(result);
      });
    });
}



  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

addEmployee();