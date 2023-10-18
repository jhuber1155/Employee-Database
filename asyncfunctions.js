const express = require('express');

async function viewEmployees() {
  return new Promise(async (resolve, reject) => {
    try{
    const result = db.promise().query('SELECT e.id AS id, e.first_name AS first_name, e.last_name AS last_name, r.title AS title, d.name AS department, r.salary AS salary, e.manager_id AS manager FROM employee e JOIN role r ON e.role_id = r.id JOIN department d ON r.department_id = d.id;');    
    console.table(result);
  } catch (error) {
    console.log(error);
    await displayMainMenu();
  }
}
  )};

async function viewEmployeeManager() {
  return new Promise(async (resolve, reject) => {
    try{
    const result = db.promise().query('SELECT e.id AS id, e.first_name AS first_name, e.last_name AS last_name, r.title AS title FROM employee e JOIN role r ON e.role_id = r.id WHERE manager_id IS null;');  
    console.table(result);
    return result;
  } catch (error) {
    console.log(error);
    await displayMainMenu();
  }
}
  )};


async function addEmployee() {
    try {
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
  
      const data = await inquirer.prompt([
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
          message: 'What is the employee\'s manager id number?',
          choices: manager
        }
      ]);
  
      const result = await new Promise((resolve, reject) => {
        const sql = `INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?, ?)`;
        const params = [data.id, data.first_name, data.last_name, data.role_id, data.manager_id];
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
      await displayMainMenu();
    }
  }

async function updateEmployee() {
    try{
    const  employeeList = [];
    const employees = await viewEmployees();
    for (i=0; i<employees.length; i++){
    employeeList.push({name: employees[i].first_name + ' ' + employees[i].last_name, value: employees[i].id})
    }
    const  title = [];
    const roles = await viewRoles();
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
    await displayMainMenu();
}
}


async function viewRoles() {
  return new Promise(async (resolve, reject) => {
    try{
      const result = db.promise().query('SELECT r.id AS id, r.title AS title, r.salary AS salary, d.name AS department FROM role r JOIN department d ON r.department_id = d.id;');  
      console.table(result);
      return result;
    } catch (error) {
      console.log(error);
      await displayMainMenu();
    }
  }
    )};

async function addRole() {
  return new Promise(async (resolve, reject) => {
    try{
    const  title = [];
    const roles = await viewRoles();
    for (i=0; i<roles.length; i++){
    title.push({name: roles[i].title, value: roles[i].id})
    }
    const department = [];
    const departments = await viewDepartments ();
    for ( i=0; i<departments.length; i++){
    department.push({name: roles[i].department, value: roles[i].id})
    }
    const data = await inquirer
    .prompt([
      {
        name: 'title',
        type: 'list',
        message: 'What is the title of the role?',
        choices: title
      },
      {
        name: 'salary',
        type: 'number',
        message: 'What is the salary of the role?',
      },
      {
        name: 'department_id',
        type: 'list',
        message: 'What department is the new role in?',
        choices: department
      },
    ]);

      const result = await new Promise((resolve, reject) => {
        const sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
        const params = [data.title, data.salary, data.department_id];
      
        db.query(sql, params, (err, result) => {
          if (err) {
            reject(err);
           } else {
              resolve(result);
              console.log("New Role Created!");
          }
            });
          });
      }   catch (error) {
          console.log(error);
          await displayMainMenu();
      }
      }
    )};

function viewDepartments() {
  return new Promise(async (resolve, reject) => {
    try{
      const result = db.promise().query('SELECT * FROM department', function (err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result);
          console.table(result);
        }
      });
  } catch (error) {
    console.log(error);
    await displayMainMenu();
  }
  })
  };

async function addDepartment() {
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
          await displayMainMenu();
      }
      }

async function displayMainMenu() {
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
          await displayMainMenu();
        }
      }
      

async function updateManager() {
  try{
    const  manager = [];
    const managers = await viewEmployeeManager();
    for (i=0; i<managers.length; i++){
    manager.push({name: managers[i].first_name + ' ' + managers[i].last_name, value: manager[i].id})
    }
    const  title = [];
    const roles = await viewRoles();
    for (i=0; i<roles.length; i++){
    title.push({name: roles[i].title, value: roles[i].id})
    }
  const data = await inquirer
    .prompt([
      {
        name: 'id',
        type: 'list',
        message: 'Which manager would you like to change roles?',
        choices: manager
      },
      {
        name: 'role_id',
        type: 'list',
        message: 'What role do you want the manager to have?',
        choices: title
      }
        ])
    const result = await new Promise((resolve, reject) => {
    const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
    db.query(sql, params, (err, result) => {
      if (err) {
        reject(err);
       } else {
          resolve(result);
          console.log("Manager Updated!");
      }
        });
      });
  }   catch (error) {
      console.log(error);
      await displayMainMenu();
  }
  }

function quit() {
    process.exit(0);
    };

module.exports = { viewEmployees, viewEmployeeManager, addEmployee, updateEmployee, updateManager, viewRoles, addRole, viewDepartments, addDepartment, quit,};
