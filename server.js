const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');

const {
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

const functions = [
  { name: "View All Employees", value: viewEmployees },
  { name: "Add Employee", value: addEmployee },
  { name: "Update Employee Role", value: updateEmployee },
  { name: "Update Manager Role", value: updateManager },
  { name: "View All Roles", value: viewRoles },
  { name: "Add a Role", value: 
  addRole },
  { name: "View All Departments", value: viewDepartments },
  { name: "Add Department", value: addDepartment },
  { name: "View Managers", value: viewEmployeeManager},
  { name: "Quit", value: quit },
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

async function mainMenu() {
  try {
    const answer = await inquirer.prompt([
      {
        name: 'menu',
        type: 'list',
        message: 'Main Menu: What would you like to do?',
        choices: functions,
      },
    ]);

    const selectedFunction = answer.menu;

    if (selectedFunction === viewEmployees) {
      await viewEmployees();
    } else if (selectedFunction === addEmployee) {
      await addEmployee();
    } else if (selectedFunction === updateEmployee) {
      await updateEmployee();
    } else if (selectedFunction === updateManager) {
      await updateManager();
    } else if (selectedFunction === viewRoles) {
      await viewRoles();
    } else if (selectedFunction === 
      addRole) {
      await addRole();
    } else if (selectedFunction === 
      viewDepartments) {
      await viewDepartments();
    } else if (selectedFunction === addDepartment) {
      await addDepartment();
    } else if (selectedFunction === viewEmployeeManager) {
      await viewEmployeeManager();
    } else if (selectedFunction === quit) {
      console.log("Exiting the application.");
      process.exit(0);
    } else {
      console.log("Invalid choice. Please try again.");
    }
    await mainMenu();
  } catch (error) {
    console.log(error);
  }
}

mainMenu();


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});