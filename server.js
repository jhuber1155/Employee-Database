const express = require('express');
const mysql = require('mysql2');//required for homework, allows us to interact with the SQL database
const inquirer = require('inquirer');//required for homework, asks the user questions in command prompt

const {//constant reference variable that allows us to access the functions from the asynfunctions javascript page
  viewEmployees,
  viewEmployeeManager,
  addEmployee,
  updateEmployee,
  updateManager,
  viewRoles,
  addRole,
  viewDepartments,
  addDepartment,
  quit,
} = require('./asyncfunctions');

const functions = [//putting those functions into an answer key to use for inquirer.
  { name: "View All Employees", value: viewEmployees },
  { name: "Add Employee", value: addEmployee },
  { name: "Update Employee Role", value: updateEmployee },
  { name: "Update Manager Role", value: updateManager },
  { name: "View All Roles", value: viewRoles },
  { name: "Add a Role", value: addRole },
  { name: "View All Departments", value: viewDepartments },
  { name: "Add Department", value: addDepartment },
  { name: "View Managers", value: viewEmployeeManager },
  { name: "Quit", value: quit },
];

const PORT = process.env.PORT || 3001;//opening the port to access SQL database
const app = express();

const db = mysql.createConnection(//the actual connection with the name, host, and password needed to access the SQL database
{
  host: 'localhost',
  user: 'root',
  password: 'SQLPassword1!',
  database: 'employees_db',
},
console.log('Connected to the employees_db database.')//console log letting you know that you successfully logged onto the database
);
mainMenu();//the main menu function to bring up the inqurier prompt full of questions to then choose further functions as answers.



async function mainMenu() {//async function allows other things to happen while it is processing.
  while (true) {//checks to see that you want to stay in the main menu, otherwise you quit
    try {//try catch function associated with async functions, looking for errors and catching them.
      const answer = await inquirer.prompt([//prompt asking the user what they would like to do
        {
          name: 'menu',
          type: 'list',
          message: 'Main Menu: What would you like to do?',
          choices: functions,
        },
      ]);

      const selectedFunction = answer.menu;//putting the functions into a format the prompt can read

      //corresponding functions to the answers chosen by the prompter above.
      if (selectedFunction === viewEmployees) {
        await viewEmployees(db);
      } else if (selectedFunction === addEmployee) {
        await addEmployee(db);
      } else if (selectedFunction === updateEmployee) {
        await updateEmployee(db);
      } else if (selectedFunction === updateManager) {
        await updateManager(db);
      } else if (selectedFunction === viewRoles) {
        await viewRoles(db);
      } else if (selectedFunction === addRole) {
        await addRole(db);
      } else if (selectedFunction === viewDepartments) {
        await viewDepartments(db);
      } else if (selectedFunction === addDepartment) {
        await addDepartment(db);
      } else if (selectedFunction === viewEmployeeManager) {
        await viewEmployeeManager(db);
      } else if (selectedFunction === quit) {
        console.log("Exiting the application.");
        process.exit(0);//exit function
      } else {
        console.log("Invalid choice. Please try again.");//if somehow you dont choose one, its still sending a response of a console log
      }
    } catch (error) {//catch, the second half of the try-catch method used with async functions
      console.error('An error occurred:', error);
    }
  }
}
