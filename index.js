// Include packages needed for this application
// const fs = require('fs');
const express = require("express");
const inquirer = require('inquirer');
const mysql = require("mysql2");
const {
    userInfo
} = require("os");


// Create MySQL login
const connection = mysql.createConnection({
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // MySQL password
        password: 'MySQL42$@',
        database: 'company_db'
    },
    console.log(`Connected to the company_db database.`)
);

let names = [];
connection.query("SELECT firstName, lastName FROM employees", function (err, results) {
    if (err){
        console.log(err);
    }
    for(var i = 0; i < results.length; i++){
        names.push(results[i].firstName);   
    }
});

let departmentsArr = [];
connection.query("SELECT departmentName FROM departments", function (err, results) {
    if (err){
        console.log(err);
    }
    for(var i = 0; i < results.length; i++){
        departmentsArr.push(results[i].departmentName);   
    }
});

let rolesArr = [];
connection.query("SELECT roleName FROM roles", function (err, results) {
    if (err){
        console.log(err);
    }
    for(var i = 0; i < results.length; i++){
        rolesArr.push(results[i].roleName);   
    }
});

// Array of questions for user input
inquirer
    .prompt([{
            type: 'list',
            message: 'What would you like to do?',
            name: 'options',
            choices: ['View All Departments',
            'View All Roles',
            'View All Employees',
            'Add a Department',
            'Add a Role',
            'Add an Employee',
            'Update an Employee Role',
            'Delete a Role']
        },

        // ## View All Departments
        {
            type: 'list',
            message: 'View All Departments',
            name: 'allDepartments',
            choices: departmentsArr,
            when: (answers) => answers.options === 'View All Departments'
        },

        // ## View All Roles
        {
            type: 'list',
            message: 'View All Roles',
            name: 'allRoles',
            choices: rolesArr,
            when: (answers) => answers.options === 'View All Roles'
        },

        // ## View All Employees
        {
            type: 'list',
            message: 'View All Employees',
            name: 'allEmployees',
            choices: names,
            when: (answers) => answers.options === 'View All Employees'
        },

        // Add new Department
        {
            type: 'input',
            message: 'What is the name of the new department?',
            name: 'departmentName',
            when: (answers) => answers.options === 'Add a Department'
        },

        // Add new Role
        {
            type: 'input',
            message: 'What is the name of the new role?',
            name: 'roleName',
            when: (answers) => answers.options === 'Add a Role'
        },

        // Add new Employee
        {
            type: 'input',
            message: 'What is the last name of the new employee?',
            name: 'lastName',
            when: (answers) => answers.options === 'Add an Employee'
        },
        {
            type: 'input',
            message: 'What is the first name of the new employee?',
            name: 'firstName',
            when: (answers) => answers.options === 'Add an Employee'
        },
        {
            type: 'input',
            message: 'What is the manager ID for the manager of the new employee?',
            name: 'managerId',
            when: (answers) => answers.options === 'Add an Employee'
        },
        {
            type: 'input',
            message: 'What is the role of the new employee?',
            name: 'employeeRole',
            when: (answers) => answers.options === 'Add an Employee'
        },
        {
            type: 'input',
            message: 'What role would you like to delete?',
            name: 'deleteRole',
            when: (answers) => answers.options === 'Delete a Role'
        },
    ])

    // Print user input to the console
    .then((response) => {

        if(response.options === "Add a Department"){
            // connect to mysql and insert the data into the database
            connection.query("INSERT INTO departments VALUES (?)", [response.departmentName], function (error, results) {
                if(error){
                    return console.error(error.message);
                }
                console.log(results);
            })
        }   else if (response.options === "Add a Role"){
            connection.query("INSERT INTO roles VALUES (?)", [response.roleName], function (error, results) {
                if(error){
                    return console.error(error.message);
                }
                console.log(results);
            })
        }   else if (response.options === "View Roles"){
            connection.query("SELECT * FROM roles", function (error, results) {
                if(error){
                    return console.error(error.message);
                }
                console.log(results);
            })
        }   else if (response.options === "delete Roles"){
            connection.query("DELETE FROM roles WHERE roleName = ?", [response.roleName], function (error, results) {
                if(error){
                    return console.error(error.message);
                }
                console.log(results);
            })
        }   else if (response.options === "Add an Employee"){
            connection.query("INSERT INTO employees VALUES (?, ?, ?, ?)", [response.lastName, response.firstName, response.managerId, response.employeeRole], function (error, results) {
                if(error){
                    return console.error(error.message);
                }
                console.log(results);            })
        }
    });