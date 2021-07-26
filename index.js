// Include packages needed for this application
const fs = require('fs');
const inquirer = require('inquirer');

// Array of questions for user input
inquirer
    .prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'viewOptions',
            choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role']
        },
        // ## View All Departments
        {
            type: 'list',
            message: 'View All Departments',
            name: 'viewAllDeppartments',
            choices: ['Engineering', 'Finance', 'Legal', 'Sales']
        },


    ])

    // Print user input to the console
    .then((response) => {
        console.log(response);

        // Contents of README.md file
        const outputReport =
            `${response.title}
`;

        // Create the output.md file in ./output/ or show error if unsuccessful
        fs.writeFile("./output/outputReport.md", outputReport, (err) =>
            err ? console.error(err) : console.log('Success!  Your new, good README.md is in ./output :)')
        );
    });
