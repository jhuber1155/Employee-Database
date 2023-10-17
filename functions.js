// const inquirer = require('inquirer');
// const mysql = require('mysql2');

// // const db = mysql.createConnection(
// //     {
// //       host: 'localhost',
// //       user: 'root',
// //       password: 'SQLPassword1!',
// //       database: 'employees_db'
// //     },
// //     console.log(`Connected to the employees_db database.`)
// //   );

// function viewEmployees() {

//     db.promise().query(`SELECT e.id AS id, e.first_name AS first_name, e.last_name AS last_name, r.title AS title, d.name AS department, r.salary AS salary, e.manager_id AS manager FROM employee e JOIN role r ON e.role_id = r.id JOIN department d ON r.department_id = d.id;`)  //?????
//     .then( ([rows]) => {
//     console.log(rows);
// })
//     .catch(console.log)
//     .then( () => db.end())
// };

// async function addEmployee() {
//     const  title = []
//     const roles = viewRoles();
//     for (i=0; i<roles.length; i++){
//     title.push({name: result[i].title, value: result[i].id})
//     }
//         inquirer
//         .prompt([
//             {
//                 name: first_name,
//                 type: input,
//                 message: "What is their first name?"
//             },
//             {
//                 name: last_name,
//                 type: input,
//                 message: "What is their last name?"
//             },
//             {
//                 name: role_id,
//                 type: list,
//                 message: "What is their role?",
//                 choices: title
//             },
//             {
//                 name: manager_id,
//                 type: list,
//                 message: "Who is the employees manager?",
//                 choices: [1, 2, 3, 4, 5, 6, 7, 8]
//             }
//         ])
//         .then (await (answers),
//         db.promise(answers).query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${first_name}', '${last_name}', ${role_id}, ${manager_id});`)
//         .then(([dbformat]) => {
//         db.promise(dbformat).query(`SELECT e.id AS id, e.first_name AS first_name, e.last_name AS last_name, r.title AS title, e.manager_id AS manager FROM employee e JOIN role r ON e.role_id = r.id;`)
//         console.log(dbformat);
//     })
//         .catch(console.log)
//         .then( () => db.end()))
// };

// function updateEmployee() {
//         inquirer
//         .prompt([
//             {
//                 name: id,
//                 type: list,
//                 message: "Which employees role would you like to update?",
//                 choices: [1, 2, 3, 4, 5, 6, 7, 8]
//             },
//             {
//                 name: role_id,
//                 type: input,
//                 message: "What role do you want to assign to the selected employee?",
//                 choices: [1, 2, 3, 4]
//             },
//         ])
//         db.promise().query(`UPDATE employee SET role_id = '${role_id}' WHERE id = '${id}';`)
//     .then( ([rows]) => {
//         console.log(rows);
//     })
//         .catch(console.log)
//         .then( () => db.end())
// };

// function viewRoles() {
//     db.promise().query(`SELECT * FROM role`)
//         .then( ([rows]) => {
//         console.log(rows);
//     })
//         .catch(console.log)
//         .then( () => db.end())
// };

// function addRole() {
//     inquirer
//     .prompt([
//         {
//             name: title,
//             type: input,
//             message: "What is the name of the role?"
//         },
//         {
//             name: salary,
//             type: number,
//             message: "What is the salary of the role?"
//         },
//         {
//             name: department_id,
//             type: list,
//             message: "What which department does the role belong to?",
//             choices: [1, 2, 3, 4]
//         }
//     ])
//     db.promise().query(`INSERT INTO role (title, salary, department_id) VALUES ('${title}', ${salary}, ${department_id});`)
//     .then( ([rows]) => {
//         console.log(rows);
//     })
//         .catch(console.log)
//         .then( () => db.end())
// };

// function viewDepartments() {
//     db.promise().query(`SELECT * FROM department`)
//         .then( ([rows]) => {
//         console.log(rows);
//     })
//         .catch(console.log)
//         .then( () => db.end())
// };

// function addDepartment() {
//     inquirer
//     .prompt([
//         {
//             name: department_name,
//             type: input,
//             message: "What is the name of the department?"
//         },
//     ])
//     db.promise().query(`INSERT INTO department (name) VALUES ('${department_name}');`)
//     .then( ([rows]) => {
//         console.log(rows);
//     })
//         .catch(console.log)
//         .then( () => db.end())
// };

// function updateManager() {
//     inquirer
//     .prompt([
//         {
//             name: id,
//             type: list,
//             message: "Which employees manager would you like to update?",
//             choices: ["John Doe", "Mike Chan", "Ashley Rodriguez", "Kevin Tupik", "Kunal Singh","Malia Brown", "Sarah Lourd", "Tom Allen"]
//         },
//         {
//             name: manager_id,
//             type: input,
//             message: "What manager do you want to assign to the selected employee?"
//         },
//     ])
//     db.promise().query(`UPDATE employee SET manager_id = '${manager_id}' WHERE id = '${id}';`)
// .then( ([rows]) => {
//     console.log(rows);
// })
//     .catch(console.log)
//     .then( () => db.end())
// };

// function viewEmployeeManager() {
//     db.promise().query(`SELECT manager_id AS manager, COUNT(id) AS employee FROM employee e GROUP BY manager_id;`)
// .then( ([rows]) => {
//     console.log(rows);
// })
//     .catch(console.log)
//     .then( () => db.end())
// };

// function quit() {
// process.exit();
// };

// console.log(roles);
// db.query(`SELECT * FROM role`, (err, result) => {
//     // console.log(result)
//     // for ()
    
//     // managers.push({name: result[i].name, value: result[i].id})
    
// }) 

// // addEmployee();


// // module.exports = { viewEmployees, addEmployee, updateEmployee, viewRoles, addRole, viewDepartments, addDepartment, updateManager, viewEmployeeManager, quit };