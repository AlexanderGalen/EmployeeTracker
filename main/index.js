const sql = require("mysql2");
const inquirer = require("inquirer");
const tabler = require("console.table");

// set up sql connection for later
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "employees_db",
  });

// include our custom sql helper files

// all of them will use the sql connection that we just set up

// one that selects everything from a table given as a parameter
function selectFromTable(connection, table) {
    connection.query("SELECT * FROM ?;", [table], (err, results) =>{
        if(err) {
            console.log(err);
        }
        else {
            console.log(results);
        }
    });
}

// another that adds a new department (name)
function addDepartment(connection, name) {
    connection.query("INSERT INTO department VALUES ('?');", [name], (err, results) => {
        if(err) {
            console.log(err)
        }
        else {
            console.log(results);
        }
    })
}

// another that adds a role (title, salary, department_id)
function addRole(connection, title, salary, department_id) {
    connection.query("INSERT INTO role VALUES ('?', '?', '?');", [title, salary, department_id], (err, results) => {
        if(err) {
            console.log(err);
        }
        else {
            console.log(results);
        }
    })
}

// another that adds an employee (fname, lname, role_id, manager_id || null)

function addEmployee(connection, firstName, lastName, role_id, manager_id) {
    connection.query("INSERT INTO employee VALUES ('?', '?', '?', '?');", [firstName, lastName, role_id, manager_id], (err, results) => {
        if(err) {
            console.log(err);
        }
        else {
            console.log(data);

        }
    })
}


// inquire the user what they wish to see or do
// by offering a list of choices: 
// "view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update employee role" 
inquirer.prompt([
    {
        type: "list",
        name: "choice",
        message: "Please choose an option:",
        choices: [
            "view all departments",
            "view all roles",
            "view all employees",
            "add a department",
            "add a role",
            "add an employee",
            "update employee role",
        ],
    }
])
.then((answers) => {

    let choice = answers.choice;
    
    // use switch statment to handle each chosen option
    // run the corresponding SQL query to do the chosen action
    switch (choice) {
        case "view all departments":
            
        break;

        case "view all roles":
            
        break;

        case "view all employees":
            
        break;

        case "add a department":
            
        break;

        case "add a role":
            
        break;

        case "add an employee":
            
        break;

        case "update employee role":
            
        break;
        
        default:
            console.log("choice invalid");
        break;
    }

    // pass its results into console.table to output formatted data to the console

});
