const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');

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

async function viewEmployeeManager(db) {
  try {
    const [result] = await db.promise().query('SELECT e.id AS id, e.first_name AS first_name, e.last_name AS last_name, r.title AS title FROM employee e JOIN role r ON e.role_id = r.id WHERE manager_id IS null;');  
    console.table(result);
  } catch (error) {
    console.log(error);
    await displayMainMenu(db);
  }
};

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
    

function quit(db) {
    process.exit(0);
    };

module.exports = { viewEmployees, viewEmployeeManager, addEmployee, updateEmployee, updateManager, viewRoles, addRole, viewDepartments, addDepartment, quit};
