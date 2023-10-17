export function viewEmployees() {
    db.query('SELECT e.id AS id, e.first_name AS first_name, e.last_name AS last_name, r.title AS title, d.name AS department, r.salary AS salary, e.manager_id AS manager FROM employee e JOIN role r ON e.role_id = r.id JOIN department d ON r.department_id = d.id;', function (err, results) {
      console.table(results);
    })
    };

export async function addEmployee() {
    const  title = []
    const roles = await viewRoles();
    for (i=0; i<roles.length; i++){
    title.push({name: data[i].title, value: data[i].id})
    }
    const manager = []
    const managers = await viewEmployeeManager ();
    for ( i=0; i<managers.length; i++){
    manager.push({name: data[i].manager, value: data[i].id})
    }

    inquirer 
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
        name: role_id,
        type: list,
        message: "What is their role?",
        choices: title
      },
      {
        name: 'manager_id',
        type: 'list',
        message: 'What is the employees manager id number?',
        choices: manager
      }
    ])
  .then((data) => {
  const sql = `INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
      VALUES (?, ?, ?, ?, ?)`;
    const params = [data.id, data.first_name, data.last_name, data.role_id, data.manager_id];
  db.query(sql, params, (err, result) => {
      if (err) {
        console.log(err)
        return;
      }
      console.table(result)
    })
  })
};

export async function updateEmployee() {
    const  employee = []
    const employees = await viewEmployees();
    for (i=0; i<employees.length; i++){
    title.push({name: data[i].employee, value: data[i].id})
    }
    const  title = []
    const roles = await viewRoles();
    for (i=0; i<roles.length; i++){
    title.push({name: data[i].title, value: data[i].id})
    }
  inquirer
    .prompt([
      {
        name: 'id',
        type: 'list',
        message: 'Which employee id would you like to change roles?',
        choice: employee
      },
      {
        name: 'role_id',
        type: 'list',
        message: 'What role id do you want the employee to have?',
        choice: title
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
          message: 'Employee successfully updated',
          changes: result.affectedRows
        });
      }
    });
  });
  };

export function viewRoles() {
    db.query('SELECT r.id AS id, r.title AS title, r.salary AS salary, d.name AS department FROM role r JOIN department d ON r.department_id = d.id;', function (err, results) {
      console.table(results);
    });
    };

export async function addRole() {
    const  title = []
    const roles = await viewRoles();
    for (i=0; i<roles.length; i++){
    title.push({name: data[i].title, value: data[i].id})
    }
    const department = []
    const departments = await viewDepartments ();
    for ( i=0; i<departments.length; i++){
    department.push({name: data[i].department, value: data[i].id})
    }
    inquirer
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
        choice: department
      },
    ])
        .then((data) => {
        const sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
        const params = [data.title, data.salary, data.department_id];
      
        db.query(sql, params, (err, result) => {
        if (err) {
        console.log(err);
        return;
        }
        console.log('New role added successfully!');
        });
    });
};

export function viewDepartments() {
    db.query('SELECT * FROM department', function (err, results) {
    console.table(results);
    });
};

export function addDepartment() {
    inquirer
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
    .then((data) => {
      const sql = `INSERT INTO department (id, name) VALUES (?, ?)`;
      const params = [data.id, data.department_name];
      db.query(sql, params, (err, result) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log('New department added successfully!');
      });
    });
  };

export function quit() {
    process.exit();
    };
