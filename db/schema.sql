-- Create company database
DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;
USE company_db;

-- COMPANY TABLES
CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    departmentName VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    roleName VARCHAR(30) NOT NULL
    -- departmentName VARCHAR(30) FOREIGN KEY REFERENCES ?????
);

CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    lastName VARCHAR(30) NOT NULL,
    firstName VARCHAR(30) NOT NULL
);

SELECT * FROM departments