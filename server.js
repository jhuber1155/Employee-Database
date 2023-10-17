const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');

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

// inquirer
//   .prompt([
//     {
//       name:'menu',
//       type: 'list',
//       message: 'What would you like to do?',
//       choices: ["View All Employees", "Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Deparments", "Add Department"]
//     }
//   ])
// db.query('SELECT * FROM employee', function (err, results) {
//   console.log(results);
// });



// let deletedRow = 2;

// db.query(`DELETE FROM employee WHERE id = ?`, deletedRow, (err, result) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(result);
// });

// inquirer
//   .prompt([
//     {
//       name: 'id',
//       type: 'number',
//       message: 'What is the employees id?'
//     },
//     {
//       name: 'first_name',
//       type: 'input',
//       message: 'What is the employees first name?'
//     },
//     {
//       name: 'last_name',
//       type: 'input',
//       message: 'What is the employees last name?'
//     },
//     {
//       name: 'role_id',
//       type: 'number',
//       message: 'What is the employees role number?'
//     },
//     {
//       name: 'manager_id',
//       type: 'number',
//       message: 'What is the employees manager id number?'
//     }
//   ])
// .then((data) => {
// const sql = `INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
//     VALUES (?, ?, ?, ?, ?)`;
//   const params = [data.id, data.first_name, data.last_name, data.role_id, data.manager_id];
  
//   db.query(sql, params, (err, result) => {
//     if (err) {
//       console.log(err)
//       return;
//     }
//     console.log(result)
//     });
//   });

inquirer
  .prompt([
    {
      name: 'id',
      type: 'input',
      message: 'Which employee id would you like to change roles?'
    },
    {
      name: 'role_id',
      type: 'number',
      message: 'What role id do you want the employee to have?'
    }
      ])
.then((data) => {
const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
  const params = [data.role_id, data.id];

  db.query(sql, params, (err, result) => {
    if (err) {
    console.log(err)
    return
    } else if (!result.affectedRows) {
      console.log({
        message: 'Employee not found'
      });
    } else {
      console.log({
        message: 'success',
        changes: result.affectedRows
      });
    }
  });
});


// db.query('SELECT COUNT(role_id) AS total_count FROM employee GROUP BY role_id', function (err, results) {
//   console.log(results);
// });

// db.query('SELECT SUM(quantity) AS total_in_section, MAX(quantity) AS max_quantity, MIN(quantity) AS min_quantity, AVG(quantity) AS avg_quantity FROM favorite_books GROUP BY section', function (err, results) {
//   console.log(results);
// });

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

