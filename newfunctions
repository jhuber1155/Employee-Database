// //prompt to view all employees
// db.query('SELECT * FROM employee', function (err, results) {
//     console.log(results);
//   });

// //prompt to put in new employee
// inquirer 
//   .prompt([
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


// //update employee
// inquirer
//   .prompt([
//     {
//       name: 'id',
//       type: 'input',
//       message: 'Which employee id would you like to change roles?'
//     },
//     {
//       name: 'role_id',
//       type: 'number',
//       message: 'What role id do you want the employee to have?'
//     }
//       ])
// .then((data) => {
// const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
//   const params = [data.role_id, data.id];

//   db.query(sql, params, (err, result) => {
//     if (err) {
//     console.log(err)
//     return
//     } else if (!result.affectedRows) {
//       console.log({
//         message: 'Employee not found'
//       });
//     } else {
//       console.log({
//         message: 'success',
//         changes: result.affectedRows
//       });
//     }
//   });
// });

// //prompt to view all roles
// db.query('SELECT * FROM role', function (err, results) {
//     console.log(results);
//   });

// //Adding new role
// inquirer
//   .prompt([
//     {
//       name: 'title',
//       type: 'input',
//       message: 'What is the title of the role?',
//     },
//     {
//       name: 'salary',
//       type: 'number',
//       message: 'What is the salary of the role?',
//     },
//     {
//       name: 'department_id',
//       type: 'number',
//       message: 'What is the department id number of the role?',
//     },
//   ])
//   .then((data) => {
//     const sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
//     const params = [data.title, data.salary, data.department_id];

//     db.query(sql, params, (err, result) => {
//       if (err) {
//         console.log(err);
//         return;
//       }
//       console.log('New role added successfully!');
//     });
//   });

//   //view department
//   db.query('SELECT * FROM department', function (err, results) {
//     console.log(results);
//   });

//   //add department
//   inquirer
//   .prompt([
//     {
//       name: 'id',
//       type: 'number',
//       message: 'What is the id of the department?',
//     },
//     {
//       name: 'department_name',
//       type: 'string',
//       message: 'What is the name of the department?',
//     },
//   ])
//   .then((data) => {
//     const sql = `INSERT INTO department (id, name) VALUES (?, ?)`;
//     const params = [data.id, data.department_name];
//     db.query(sql, params, (err, result) => {
//       if (err) {
//         console.log(err);
//         return;
//       }
//       console.log('New department added successfully!');
//     });
//   });