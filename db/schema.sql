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

-- Managers table
CREATE TABLE managers (
    id INT NOT NULL,
    lastName VARCHAR(30) NOT NULL,
    firstName VARCHAR(30) NOT NULL,
    salary INT NOT NULL,
    PRIMARY KEY (id)
);

-- Employees TABLE
CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    lastName VARCHAR(30) NOT NULL,
    firstName VARCHAR(30) NOT NULL,
    salary INT NOT NULL,
    eRole VARCHAR(30),
    manager_id INT NULL
    -- CONSTRAINT employees_ibfk_1,
    -- PRIMARY KEY (id)
    -- FOREIGN KEY (manager_id)
    -- REFERENCES managers(id)
    -- ON DELETE SET NULL
);