const { default: inquirer } = require("inquirer");

// const department = [
//     "Sales", "Engineering", "Finance", "Legal"
// ];

// const roles = [
//     "Sales Lead","Salesperson", "Lead Engineer", "Software Engineer","Account Manager", "Accountant", "Legal Team Lead", "Lawyer"
// ];

// const employees = [
//     "John Doe", "Mike Chan", "Ashley Rodriguez", "Kevin Tupik", "Kunal Singh","Malia Brown", "Sarah Lourd", "Tom Allen"
// ];

viewEmployees(); {
// app.get('/api/viewemployee', (req, res) => {
    // const sql = `SELECT e.id AS id, e.first_name AS first_name, e.last_name AS last_name, r.title AS title, d.name AS department, r.salary AS salary, e.manager_id AS manager FROM employee e JOIN role r ON e.id = r.id JOIN department d ON r.id = d.id;`
//db.promise().query(sql, (err, rows) =>{
    // if(err) {
    //     res.status(500).json({
    //         error: err.message });
    //         return
    //     }
    //     res.json({
    //         message: 'success',
    //         data: rows
    //     })
    //     })
    // });
    db.promise().query(`SELECT e.id AS id, e.first_name AS first_name, e.last_name AS last_name, r.title AS title, d.name AS department, r.salary AS salary, e.manager_id AS manager FROM employee e JOIN role r ON e.id = r.id JOIN department d ON r.id = d.id;`)  
    .then( ([rows]) => {
    console.log(rows);
})
    .catch(console.log)
    .then( () => db.end())
};

addEmployee(); {
        inquirer
        .prompt([
            {
                name: first_name,
                type: input,
                message: "What is their first name?"
            },
            {
                name: last_name,
                type: input,
                message: "What is their last name?"
            },
            {
                name: role_id,
                type: list,
                message: "What is their role?",
                choices: roles
            },
            {
                name: manager_id,
                type: list,
                message: "Who is the employees manager?",
                choices: employees
            }
        ])
        // app.post('/api/addemployee', ({ body }, res) => {
        //     const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?)`;
        //     const params = [first_name],[last_name],[role_id],[manager_id];
        //     db.promise().query(sql, params, (err, result) => {
        //         if (err) {
        //             res.status(400).json({
        //                 error: err.message});
        //                 return;
        //             }
        //             res.json ({
        //                 message: 'success',
        //                 data: body
        //             });
        //         });
        //     });
        db.promise().query(`INSERT INTO employee ${first_name}, ${last_name}, ${role_id}, ${manager_id}`)
    .then( ([rows]) => {
        console.log(rows);
    })
        .catch(console.log)
        .then( () => db.end())
};

updateEmployee(); {
        inquirer
        .prompt([
            {
                name: id,
                type: list,
                message: "Which employees role would you like to update?",
                choices: employees
            },
            {
                name: role_id,
                type: input,
                message: "What role do you want to assign to the selected employee?"
            },
        ])
        db.promise().query(`UPDATE employee SET ${role_id} WHERE ${id}`)
    .then( ([rows]) => {
        console.log(rows);
    })
        .catch(console.log)
        .then( () => db.end())
};

viewRoles(
    db.promise().query(`SELECT * FROM role`)
        .then( ([rows]) => {
        console.log(rows);
    })
        .catch(console.log)
        .then( () => db.end())
    );

addRole(); {
    inquirer
    .prompt([
        {
            name: title,
            type: input,
            message: "What is the name of the role?"
        },
        {
            name: salary,
            type: number,
            message: "What is the salary of the role?"
        },
        {
            name: department_id,
            type: list,
            message: "What which department does the role belong to?",
            choices: departments
        }
    ])
    db.promise().query(`INSERT INTO role ${title}, ${salary}, ${department_id}`)
    .then( ([rows]) => {
        console.log(rows);
    })
        .catch(console.log)
        .then( () => db.end())
};

viewDepartments(); {
    db.promise().query(`SELECT * FROM department`)
        .then( ([rows]) => {
        console.log(rows);
    })
        .catch(console.log)
        .then( () => db.end())
};

addDepartment(); {
    inquirer
    .prompt([
        {
            name: department_name,
            type: input,
            message: "What is the name of the department?"
        },
    ])
    db.promise().query(`INSERT INTO department ${department_name}`)
    .then( ([rows]) => {
        console.log(rows);
    })
        .catch(console.log)
        .then( () => db.end())
};

quit();{
process.exit();
};

export { department, roles, employees, viewEmployees, addEmployee, updateEmployee, viewRoles, addRole, viewDepartments, addDepartment, quit };