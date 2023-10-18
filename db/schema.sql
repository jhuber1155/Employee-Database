DROP DATABASE IF EXISTS employees_db;

CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE department (
id INT NOT NULL auto_increment,
name VARCHAR(30),
PRIMARY KEY (id)
);

CREATE TABLE role (
id INT NOT NULL auto_increment,
title VARCHAR(30),
salary DECIMAL,
department_id INT,
PRIMARY KEY (id),
FOREIGN KEY (department_id)
REFERENCES department(id)
ON DELETE SET NULL
);

CREATE TABLE employee(
id INT NOT NULL auto_increment,
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id INT,
manager_id INT,
FOREIGN KEY (role_id)
REFERENCES role(id)
ON DELETE SET NULL,
PRIMARY KEY (id),
FOREIGN KEY (manager_id)
REFERENCES employee(id)
ON DELETE SET NULL
);

--The schema needed to build the database. It is based off the diagram given to us in a photo as well as the text in the paragraph format on the homework page. It has primary and foriegn keys which allow data to sync with one another based on their respective keys.--