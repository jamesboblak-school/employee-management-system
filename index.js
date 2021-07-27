// Include packages needed for this application
// const fs = require('fs');
const express = require("express");
const inquirer = require('inquirer');
const mysql = require("mysql2");
const {
    userInfo
} = require("os");

// const PORT = process.env.PORT || 3001;
// const app = express();

// // Express middleware
// app.use(express.urlencoded({
//     extended: false
// }));
// app.use(express.json());

// Create MySQL login
const connection = mysql.createConnection({
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // TODO: Add MySQL password
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
// ROUTES
//  GET
// app.get('/api/company', (req, res) => {
//     connection.query("SELECT * FROM company", function(results){

//     });
//     res.console.log("Hello, James!!")
// });


// app.listen(PORT, () =>
//     console.log(`App listening at http://localhost:${PORT} :rocket:`)
// );



// Array of questions for user input
inquirer
    .prompt([{
            type: 'list',
            message: 'What would you like to do?',
            name: 'options',
            choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role']
        },

        // ## View All Departments
        {
            type: 'list',
            message: 'View All Departments',
            name: 'allDepartments',
            choices: ['Engineering', 'Finance', 'Legal', 'Sales'],
            when: (answers) => answers.options === 'View All Departments'
        },
        {
            type: 'input',
            message: 'What is the new deptartments name?',
            name: 'departmentName',
            when: (answers) => answers.options === 'Add a Department'
        },

        // ## View All Roles
        {
            type: 'list',
            message: 'View All Roles',
            name: 'allRoles',
            choices: ['Accountant', 'Account Manager', 'Lawyer', 'Lead Engineer', 'Legal Team Lead', 'Salesperson', 'Software Engineer'],
            when: (answers) => answers.options === 'View All Roles'
        },

        // ## View All Employees
        {
            type: 'list',
            message: 'View All Employees',
            name: 'allEmployees',
            choices: names
        },

    ])

    // Print user input to the console
    .then((response) => {

        if(response.options === "Add a Department"){
            // connect to mysql and insert the data into the database
            connection.query("INSERT INTO departnment VALUES (?)", [response.departmentName], function (err, results) {

            })
        } else if (response.options === "Add a Role"){
            connection.query("INSERT INTO roles VALUES (?)", [response.roleName], function (err, results) {

            })
        } else if (response.options === "View Roles"){
            connection.query("SELECT * FROM roles", function (results) {
                console.log(results);
            })
        }
         else if (response.options === "delete Roles"){
            connection.query("DELETE FROM roles WHERE roleName = ?", [response.roleName], function (results) {
                console.log(results);
            })
        }


        // // Contents of outputReport.md file
        // const outputReport =
        //     `${response.title}`;

        // // Create the output.md file in ./output/ or show error if unsuccessful
        // fs.writeFile("./output/outputReport.md", outputReport, (err) =>
        //     err ? console.error(err) : console.log('Success!  Your new, outputReport.md is in ./output :)')
        // );
    });