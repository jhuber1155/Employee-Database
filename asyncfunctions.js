const express = require('express');
const inquirer = require('inquirer');//required for homework, asks the user questions in command prompt
const mysql = require('mysql2');//required for homework, allows us to interact with the SQL database

//async function which will use try-catch to search the SQL database with an await and promise, allowing it time to search for the employee list as determined by the database SELECT. It takes those results, and puts them into a table readable on the command line with console.table, returning the results to be viewed, otherwise it logs the error if it encounters one. Main menu is on an await until the db promise section is finished.
async function viewEmployees(db) {
  try {
    const [result] = await db.promise().query('SELECT e.id AS id, e.first_name AS first_name, e.last_name AS last_name, r.title AS title, d.name AS department, r.salary AS salary, e.manager_id AS manager FROM employee e JOIN role r ON e.role_id = r.id JOIN department d ON r.department_id = d.id;');
    console.table(result);
    return result;
  } catch (error) {
    console.log(error);
    await displayMainMenu(db);
  }
}

//an async function with the try-catch, using the database as a parameter to pass through, creating a variable of the data gathered from the db.promise.query and then taking that data and making it presentable in the console as a table while the ability to return to the main menu is last to execute due to its await function.
async function viewEmployeeManager(db) {
  try {
    const [result] = await db.promise().query('SELECT e.id AS id, e.first_name AS first_name, e.last_name AS last_name, r.title AS title FROM employee e JOIN role r ON e.role_id = r.id WHERE manager_id IS null;');  
    console.table(result);
  } catch (error) {
    console.log(error);
    await displayMainMenu(db);
  }
};
//async function passing the database using a try-catch and creating a series of arrays which will have the most up to date information pushed to them from the role section (which is looking for the role id and title of the role) as well as the manager section (which creates a null option in this case, and is looking for the id, first and last name of the employees). It starts the index at 0 and lists all the pushed data in order with a for loop. All the while, the inquirer is waiting until that data is pulled, then it asks its questions, using the arrays as part of the answers. It then takes those answers, and in a new promise (used with async functions) inserts the users input into the appropriate place in the database with the correct value corresponding to the correct place in the row and column. The database then resolves the query through the searched parameters and resolves (one of the pieces of the new Promise) the results, otherwise it will reject (the other part of the new Promise) with an error. The catch function rounds out the function looking for errors otherwise the main menu function will execute.
  async function addEmployee(db) {
    try {
      const title = [];
      const rolesData = await db.promise().query('SELECT id, title FROM role');
      const roles = rolesData[0];
      for (let i = 0; i < roles.length; i++) {
        title.push({ name: roles[i].title, value: roles[i].id });
      }
      
      const manager = [];
      manager.push({ name: 'None', value: null })
      const managersData = await db.promise().query('SELECT id, first_name, last_name FROM employee');
      const managers = managersData[0];
      for (let i = 0; i < managers.length; i++) {
        manager.push({ name: managers[i].first_name + ' ' + managers[i].last_name, value: managers[i].id });
      }
  
      const data = await inquirer
      .prompt([
        {
          name: 'first_name',
          type: 'input',
          message: 'What is the employees first name?'
        },
        {
          name: 'last_name',
          type: 'input',
          message: 'What is the employees last name?'
        },
        {
          name: 'role_id',
          type: 'list',
          message: 'What is their role?',
          choices: title
        },
        {
          name: 'manager_id',
          type: 'list',
          message: 'Who is the employees manager?',
          choices: manager
        }
      ]);
  
      const result = await new Promise((resolve, reject) => {
        const sql = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
      const params = [data.first_name, data.last_name, data.role_id, data.manager_id];
      db.query(sql, params, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
            console.log("New Employee Added!");
          }
        });
      });
    } catch (error) {
      console.log(error);
      await displayMainMenu(db);
    }
  };


  //Same thing as above, only we are updating current employee information instead of inserting new information into the database, so it looks at existing data and then changes it based on the answers to the prompts given to the user.
async function updateEmployee(db) {
    try{
    const  employeeList = [];
    const employeesData = await db.promise().query('SELECT id, first_name, last_name FROM employee');
    const employee = employeesData[0];
    for (i=0; i<employee.length; i++){
    employeeList.push({name: employee[i].first_name + ' ' + employee[i].last_name, value: employee[i].id})
    }
    const  title = [];
    const rolesData = await db.promise().query('SELECT id, title FROM role');
    const roles = rolesData[0];
    for (i=0; i<roles.length; i++){
    title.push({name: roles[i].title, value: roles[i].id})
    }


  const data = await inquirer
    .prompt([
      {
        name: 'id',
        type: 'list',
        message: 'Which employee id would you like to change roles?',
        choices: employeeList
      },
      {
        name: 'role_id',
        type: 'list',
        message: 'What role id do you want the employee to have?',
        choices: title
      }
        ])
  const result = await new Promise((resolve, reject) => {
  const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
    const params = [data.role_id, data.id];
    db.query(sql, params, (err, result) => {
      if (err) {
      reject(err);
     } else {
        resolve(result);
        console.log("Employee Updated!");
    }
      });
    });
}   catch (error) {
    console.log(error);
    await displayMainMenu(db);
}
};

//An async funtion with try-catch passing the parameter of the database, taking the results of the db.promise.query and saving it as a variable which it then logs in a table format in the console while the main menu function waits until everything else is done before it is called.
async function viewRoles(db) {
  try {
    const [result] = await db.promise().query('SELECT r.id AS id, r.title AS title, r.salary AS salary, d.name AS department FROM role r JOIN department d ON r.department_id = d.id;');
    
    console.table(result);

    return result;
  } catch (error) {
    console.log(error);
    await displayMainMenu(db);
  }
};


// Async await function with a try-catch where it will create new data of a new role by gathering existing ids and titles from roles as well as departments. It will then ask what the new role is, what it will pay, and which department it should correspond to. It will insert that data into the database and confirm that a new role was created.
async function addRole(db) {
  try{
    const  title = [];
    const rolesData = await db.promise().query('SELECT id, title FROM role')
    const roles = rolesData[0];
    for (let i=0; i<roles.length; i++){
    title.push({name: roles[i].title, value: roles[i].id})
    }
    const department = [];
    const departmentsData = await db.promise().query('SELECT id, name FROM department')
    const departments = departmentsData[0];
    for (i=0; i<departments.length; i++) {
    department.push({ name: departments[i].name, value: departments[i].id });
    }
    
    const data = await inquirer.prompt([
      {
        name: 'title',
        type: 'input',
        message: 'What is the title of the role?',
      },
      {
        name: 'salary',
        type: 'input',
        message: 'What is the salary of the role?',
      },
      {
        name: 'department_id',
        type: 'list',
        message: 'Select the department for the new role:',
        choices: department,
      },
    ]);
    
    const sql = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';
    const params = [data.title, data.salary, data.department_id];
    
      db.query(sql, params, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
          console.log('New Role Created!');
        }
      });
    }catch (error) {
    console.log(error);
    await displayMainMenu(db);
  }}

  //Async await function which will display all of the departments in the database and put them into a table format for the console.
    async function viewDepartments(db) {
      try {
        const [rows] = await db.promise().query('SELECT * FROM department');
        console.table(rows);
        return rows;
      } catch (error) {
        console.log(error);
        await displayMainMenu(db);
      }
    };
    
//Async await with a try-catch that will create a new department to be inserted into the department database
async function addDepartment(db) {
  try{
   const data = await inquirer
    .prompt([
      {
        name: 'id',
        type: 'number',
        message: 'What is the id of the department?',
      },
      {
        name: 'department_name',
        type: 'string',
        message: 'What is the name of the department?',
      },
    ])
    const result = await new Promise((resolve, reject) => {
      const sql = `INSERT INTO department (id, name) VALUES (?, ?)`;
      const params = [data.id, data.department_name];
      db.query(sql, params, (err, result) => {
          if (err) {
            reject(err);
           } else {
              resolve(result);
              console.log("New Department Created!");
          }
            });
          });
      }   catch (error) {
          console.log(error);
          await displayMainMenu(db);
      }
      };
//An async await function that creates the main menu feel and will ask to confirm that you want to exit.
async function displayMainMenu(db) {
  try {
      const answer = await inquirer.prompt([
        {
          name: 'exit',
          type: 'confirm',
          message: 'Do you want to return to the main menu?',
        },
      ]);
      
      if (answer.exit) {
        mainMenu();
      } else {
        db.end();
        console.log('Goodbye!');
        process.exit(0);
      }
    } catch (error) {
      console.log(error);
    }
    };
      
      
//A bonus question which is an async await with a try catch and new Promise which will allow you to see the managers from an array and then ask you what role you would like them to have. It then updates that information in the database and console logs that fact to let you know that it worked successfully.
async function updateManager(db) {
  try {
    const managerList = [];
    const managersData = await db.promise().query('SELECT manager_id AS manager, COUNT(id) AS employee FROM employee e GROUP BY manager_id;');
    const managers = managersData[0];
    for (let i = 0; i < managers.length; i++) {
      managerList.push({ name: managers[i].manager, value: managers[i].manager });
      }
    
    const title = [];
    const rolesData = await db.promise().query('SELECT id, title FROM role');
    const roles = rolesData[0];
    for (let i = 0; i < roles.length; i++) {
      title.push({ name: roles[i].title, value: roles[i].id });
    }
    
    const data = await inquirer.prompt([
      {
        name: 'id',
        type: 'list',
        message: 'Which manager would you like to change roles?',
        choices: managerList
      },
      {
        name: 'role_id',
        type: 'list',
        message: 'What role do you want the manager to have?',
        choices: title
      }
    ]);
    const result = await new Promise((resolve, reject) => {
    const sql = `UPDATE employee SET role_id = ? WHERE manager_id = ?`;
    const params = [data.role_id, data.id];
    db.query(sql, params, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
        console.log("Manager Updated!");
      }
    });
  });
      } catch (error) {
      console.log(error);
      await displayMainMenu(db);
      }
    };
    
//The quit function which allows you to exit the server
function quit(db) {
    process.exit(0);
    };


    //module exports which allow us to take all these functions and read them on the server.js page, which has a corresponding import.
module.exports = { viewEmployees, viewEmployeeManager, addEmployee, updateEmployee, updateManager, viewRoles, addRole, viewDepartments, addDepartment, quit};
