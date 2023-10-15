const { default: inquirer } = require("inquirer");

const roles = [
    { name: "Sales Lead", value: "Sales Lead"},
    { name: "Salesperson", value: "Salesperson"},
    { name: "Lead Engineer", value: "Lead Engineer"},
    { name: "Software Engineer", value: "Software Engineer"},
    { name: "Account Manager", value: "Account Manager"},
    { name: "Accoutant", value: "Accountant"},
    { name: "Legal Team Lead", value: "Legal Team Lead"},
    { name: "Lawyer", value: "Lawyer"},
];

const managers = [
    { name: "John Doe", value: "John Doe"},
    { name: "Mike Chan", value: "Mike Chan"},
    { name: "Ashley Rodriguez", value: "Ashley Rodriguez"},
    { name: "Kevin Tupik", value: "Kevin Tupik"},
    { name: "Kunal Singh", value: "Kunal Singh"},
    { name: "Malia Brown", value: "Malia Brown"},
    { name: "Sarah Lourd", value: "Sarah Lourd"},
    { name: "Tom Allen", value: "Tom Allen"},
];

viewEmployees(
// app.get("/api/viewemployee", (req, res) => {
db.promise().query(`SELECT * FROM employee`)
    .then( ([rows]) => {
    console.log(rows);
})
    .catch(console.log)
    .then( () => db.end())
);

addEmployee(
    db.promise().query(
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
                choices: managers
            }
        ])
    `INSERT INTO employee ${first_name}, ${last_name}, ${role_id}, ${manager_id}`)
    .then( ([rows]) => {
        console.log(rows);
    })
        .catch(console.log)
        .then( () => db.end())
);
