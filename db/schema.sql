-- Create company database
DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;
USE company_db;

-- Company TABLES
-- Department TABLE
CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    departmentName VARCHAR(30) NOT NULL
);

-- Roles TABLE
CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    roleName VARCHAR(30) NOT NULL
);

-- Employees TABLE
CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    lastName VARCHAR(30) NOT NULL,
    firstName VARCHAR(30) NOT NULL, 
    manager_id iNT NULL,
    FOREIGN KEY manager_id REFERENCES employees manager_id ON DELETE SET NULL

);

-- CREATE TABLE employees (
--     id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     lastName VARCHAR(30) NOT NULL,
--     firstName VARCHAR(30) NOT NULL,
--     roleID INT NOT NULL,
--     managerID INT FOREIGN KEY REFERENCES ?????,
--     ON DELETE SET NULL
-- );

SELECT * FROM departments