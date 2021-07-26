DROP DATABASE IF EXISTS departments_db;
CREATE DATABASE departments_db;
USE departments_db;
CREATE TABLE departments_db (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    departmentName VARCHAR(30) NOT NULL
);

CREATE TABLE roles_db (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    roleName VARCHAR(30) NOT NULL
);



SELECT * FROM departments