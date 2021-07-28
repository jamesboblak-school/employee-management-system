// Include packages needed for this application
// const fs = require('fs');
const {
    response
} = require("express");
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


// Start the prompt
startMenu();

// Array of questions for user input
function startMenu() {

    // make an array with all the Roles in it
    let rolesArr = [];
connection.query("SELECT roleName FROM roles", function (err, results) {
    if (err) {
        console.log(err);
    }
    for (var i = 0; i < results.length; i++) {
        rolesArr.push(results[i].roleName);
    }
});
    inquirer
        .prompt([{
                type: 'list',
                message: 'What would you like to do?',
                name: 'options',
                choices: ['View All Departments',
                    'View All Roles',
                    'View All Employees',
                    'View All Managers',
                    'Add a Department',
                    'Add a Role',
                    'Add an Employee',
                    'Update an Employee Role',
                    'Delete a Department',
                    'Delete a Role',
                    'Delete an Employee',
                    'Promote an Employee',
                    'Exit'
                ]
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
                type: 'list',
                message: 'What is the role of the new employee?',
                name: 'employeeRole',
                choices: rolesArr,
                when: (answers) => answers.options === 'Add an Employee'
            },
            {
                type: 'input',
                message: 'What is the salary of the new employee?',
                name: 'employeeSalary',
                when: (answers) => answers.options === 'Add an Employee'
            },

            // Update an Employee Role
            {
                type: 'input',
                message: 'What is the ID of the employee you would like update?',
                name: 'updateEmployee',
                when: (answers) => answers.options === 'Update an Employee Role'
            },
            {
                type: 'list',
                message: 'What role would you like to update to?',
                name: 'updateRole',
                choices: rolesArr,
                when: (answers) => answers.options === 'Update an Employee Role'
            },

            // Delete a Role
            {
                type: 'input',
                message: 'What role would you like to delete?',
                name: 'deleteRole',
                when: (answers) => answers.options === 'Delete a Role'
            },

            // Delete a Department
            {
                type: 'input',
                message: 'What department would you like to delete?',
                name: 'deleteDepartment',
                when: (answers) => answers.options === 'Delete a Department'
            },

            // Delete an Employee
            {
                type: 'input',
                message: 'What is the ID of the employee you would like to delete?',
                name: 'deleteEmployee',
                when: (answers) => answers.options === 'Delete an Employee'
            },

            // Promote an Employee
            {
                type: 'input',
                message: 'What is the ID of the employee you would like to promote?',
                name: 'promoteEmployee',
                when: (answers) => answers.options === 'Promote an Employee'
            },
        ])


        // Print user input to the console
        .then((response) => {

            if (response.options === "Add a Department") {
                // connect to mysql and insert the data into the database
                connection.query("INSERT INTO departments (departmentName) VALUES (?)", [response.departmentName], (error, results) => {
                    if (error) {
                        return console.error(error.message);
                    }
                    console.log("New department successfully added!");
                    startMenu();
                })
            } else if (response.options === "View All Departments") {
                const query = "SELECT departmentName AS Department, id AS ID FROM departments ORDER BY departments.departmentName ASC"
                connection.query(query, function (error, results) {
                    if (error) {
                        return console.error(error.message);
                    }
                    console.log("===============")
                    console.log("==Departments==")
                    console.log("===============")
                    console.table(results);
                    startMenu();
                })
            } else if (response.options === "View All Roles") {
                const query = "SELECT roleName AS Role, id AS ID FROM roles ORDER BY roles.roleName ASC"
                connection.query(query, function (error, results) {
                    if (error) {
                        return console.error(error.message);
                    }
                    console.log("=========")
                    console.log("==Roles==")
                    console.log("=========")
                    console.table(results);
                    startMenu();
                })
            } else if (response.options === "View All Employees") {
                // const query = "SELECT * FROM employees ORDER BY employees.lastName ASC"
                const query = "SELECT lastName AS Last_Name, firstName AS First_Name, id AS ID, salary AS Salary, eRole AS Role, manager_id AS Manager_ID FROM employees ORDER BY employees.lastName ASC"

                connection.query(query, function (error, results) {
                    if (error) {
                        return console.error(error.message);
                    }
                    console.log("=============")
                    console.log("==Employees==")
                    console.log("=============")
                    console.table(results);
                    startMenu();
                })
            } else if (response.options === "View All Managers") {
                // const query = "SELECT * FROM managers ORDER BY managers.lastName ASC"
                const query = "SELECT lastName AS Last_Name, firstName AS First_Name, id AS ID, salary AS Salary FROM managers ORDER BY managers.lastName ASC"
                connection.query(query, function (error, results) {
                    if (error) {
                        return console.error(error.message);
                    }
                    console.log("============")
                    console.log("==Managers==")
                    console.log("============")
                    console.table(results);
                    startMenu();
                })
            } else if (response.options === "Add a Role") {
                connection.query("INSERT INTO roles (roleName) VALUES (?)", [response.roleName], function (error, results) {
                    if (error) {
                        return console.error(error.message);
                    }
                    console.log("Role successfully added!");
                    startMenu();
                })
            } else if (response.options === "Delete a Role") {
                connection.query("DELETE FROM roles WHERE roleName = ?", [response.deleteRole], function (error, results) {
                    if (error) {
                        return console.error(error.message);
                    }
                    console.log("Role successfully deleted!");
                    startMenu();
                })
            } else if (response.options === "Delete a Department") {
                connection.query("DELETE FROM departments WHERE departmentName = ?", [response.deleteDepartment], function (error, results) {
                    if (error) {
                        return console.error(error.message);
                    }
                    console.log("Department successfully deleted!");
                    startMenu();
                })
            } else if (response.options === "Add an Employee") {
                connection.query("INSERT INTO employees (lastName, firstName, manager_id, eRole, salary) VALUES (?, ?, ?, ?, ?)", [response.lastName, response.firstName, response.managerId, response.employeeRole, response.employeeSalary], function (error, results) {
                    if (error) {
                        return console.error(error.message);
                    }
                    console.log("Employee successfully added!");
                    startMenu();
                })
            } else if (response.options === "Update an Employee Role") {
                connection.query("UPDATE employees SET eRole = ? WHERE id = ?", [response.updateRole, response.updateEmployee], function (error, results) {
                    if (error) {
                        return console.error(error.message);
                    }
                    console.log("Employee role successfully updated!");
                    startMenu();
                })
            } else if (response.options === "Delete an Employee") {
                connection.query("DELETE FROM employees WHERE id = ?", [response.deleteEmployee], function (error, results) {
                    if (error) {
                        return console.error(error.message);
                    }
                    console.log("Employee successfully deleted!");
                    startMenu();
                })
            } else if (response.options === "Promote an Employee") {
                connection.query("INSERT INTO managers SELECT id, lastName, firstName, salary FROM employees WHERE id = ?", [response.promoteEmployee], function (error, results) {
                    if (error) {
                        return console.error(error.message);
                    }
                    console.log("Employee successfully promoted!");
                    connection.query("DELETE FROM employees WHERE id = ?", [response.promoteEmployee], function (error, results) {
                        if (error) {
                            return console.error(error.message);
                        }
                        console.log("Employee successfully switched from employees to managers!");
                    })
                    startMenu();
                })
            } else if (response.options === "Exit") {
                console.log("Goodbye!")
                connection.end();
            }
        });
}