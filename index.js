// Include packages needed for this application
// const fs = require('fs');
const express = require("express");
const inquirer = require('inquirer');
const mysql = require("mysql2");
const {
    userInfo
} = require("os");

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());

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
            name: 'viewOptions',
            choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role']
        },

        // ## View All Departments
        {
            type: 'list',
            message: 'View All Departments',
            name: 'allDepartments',
            choices: ['Engineering', 'Finance', 'Legal', 'Sales']
        },

        // ## View All Roles
        {
            type: 'list',
            message: 'View All Roles',
            name: 'allRoles',
            choices: ['Accountant', 'Account Manager', 'Lawyer', 'Lead Engineer', 'Legal Team Lead', 'Salesperson', 'Software Engineer']
        },

        // ## View All Employees
        {
            type: 'list',
            message: 'View All Employees',
            name: 'allEmployees',
            choices: [allEmployees]
        },

    ])

    // Print user input to the console
    .then((response) => {
        console.log(response);

        // Contents of outputReport.md file
        const outputReport =
            `${response.title}`;

        // Create the output.md file in ./output/ or show error if unsuccessful
        fs.writeFile("./output/outputReport.md", outputReport, (err) =>
            err ? console.error(err) : console.log('Success!  Your new, outputReport.md is in ./output :)')
        );
    });
