
'View Employees' SELECT e.id AS id, e.first_name AS first_name, e.last_name AS last_name, r.title AS title, d.name AS department, r.salary AS salary, e.manager_id AS manager FROM employee e JOIN role r ON e.role_id = r.id JOIN department d ON r.department_id = d.id; --????--

'Add Employee' INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('John', 'Huber', 1, 1);

SELECT e.id AS id, e.first_name AS first_name, e.last_name AS last_name, r.title AS title, e.manager_id AS manager FROM employee e JOIN role r ON e.role_id = r.id;

'Update Employee' UPDATE employee SET role_id = '${role_id}' WHERE id = '${id}';

'View Roles' SELECT * FROM role

'Add Role' INSERT INTO role (title, salary, department_id) VALUES ('${title}', ${salary}, ${department_id});

'View Department' SELECT * FROM department

'Add Department' INSERT INTO department (name) VALUES ('${department_name}');

'Update Manager' UPDATE employee SET manager_id = '${manager_id}' WHERE id = '${id}';

'View Employee Manager' SELECT manager_id AS manager, COUNT(id) AS employee FROM employee e GROUP BY manager_id;


-- INSERT INTO (table) (id, name, etc.)

-- SELECT * FROM (table) WHERE (id, name, etc) = (something)

-- UPDATE (table)
-- SET (name, id, etc)
-- WHERE (where on the table);

-- DELETE FROM (table)
-- WHERE (id, name, etc = your identifier);

-- SELECT (table), SUM(something) AS (title header) FROM (table) GROUP BY (table)

-- Writing a Join
-- SELECT * FROM (2nd table ) JOIN (1st table) ON (2nd table).(id, name, etc.) = (1st table).(id, name, etc.)

-- Rewritten as 

-- Select (firstletteroftable).(id,name,etc) AS (whatever name you want)