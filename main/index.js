const sql = require("mysql2");
const inquirer = require("inquirer");
const tabler = require("console.table");

// set up sql connection for later
const connection = sql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "employees_db",
  });

// include our custom sql helper files

// all of them will use the sql connection that we just set up

// one that selects everything from a table given as a parameter
function selectFromTable(connection, table) {
    console.log(table);
    connection.query('SELECT * FROM ??;', [table], (err, results) => {
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
    connection.query("INSERT INTO department (name) VALUES (?);", [name], (err, results) => {
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
    connection.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?);", [title, salary, department_id], (err, results) => {
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
    connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);", [firstName, lastName, role_id, manager_id], (err, results) => {
        if(err) {
            console.log(err);
        }
        else {
            console.log(results);

        }
    })
}

function updateEmployeeRole(connection, employeeId, newRoleId) {
    console.log("employeeID: " + employeeId, "newRoleID: " + newRoleId)
    connection.query("UPDATE employee SET role_id = ? WHERE id = ?", [newRoleId, employeeId], (err, results) => {
        if(err) {
            console.log(err);
        }

        else {
            console.log(results);
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
            selectFromTable(connection, "department");
            
        break;

        case "view all roles":
            selectFromTable(connection, "role");

        break;

        case "view all employees":
            selectFromTable(connection, "employee");
            
        break;

        case "add a department":
            // prompt for department name
            inquirer.prompt([
                {
                    type: "input",
                    name: "department",
                    message: "input new department name:",
                }
            ]).then((answers) => {
                
                let newDeptName = answers.department;
                addDepartment(connection, newDeptName);

            })
            
        break;

        case "add a role":
            // prompt for role name, salary, and department_id
            inquirer.prompt([
                {
                    type: "input",
                    name: "name",
                    message: "input new role name:",
                },
                {
                    type: "number",
                    name: "salary",
                    message: "input new role salary:",
                },
                {
                    type: "number",
                    name: "departmentId",
                    message: "input department ID for new role:",
                }
            ]).then((answers) => {
                
                addRole(connection, answers.name, answers.salary, answers.departmentId);

            })
            
        break;

        case "add an employee":
            // prompt for employee first name, last name, role, and manager_id
            inquirer.prompt([
                {
                    type: "input",
                    name: "firstName",
                    message: "input employee's first name:",
                },
                {
                    type: "input",
                    name: "lastName",
                    message: "input employee's last name:",
                },
                {
                    type: "number",
                    name: "roleId",
                    message: "input role ID of new employee:",
                },
                {
                    type: "number",
                    name: "managerId", 
                    message: "input manager ID for new employee, or nothing if this employee has no manager",
                }
            ]).then((answers) => {

                // use null if user didn't input anything for managerId
                if(isNaN(answers.managerId)) {
                    answers.managerId = null;
                }
                
                addEmployee(connection, answers.firstName, answers.lastName, answers.roleId, answers.managerId);

            });
            
        break;

        case "update employee role":
            // first get list of all current employees from database
            connection.query("SELECT * FROM employee;", (err, results) =>{
                if(err) {
                    console.log(err);
                }
                else {
                    // build choices array out of current employees
                    let employees = results.map((employee) => {
                        return {
                            value: employee.id,
                            name: employee.first_name + " " + employee.last_name,
                        }
                    });
                    console.log(employees);
        
                    // prompt user to choose one
                    inquirer.prompt([
                        {
                            type: "list",
                            name: "employee",
                            message: "choose an employee",
                            choices: employees,
                        }
                    ])
                    .then((answers) => {
                        // prompt user to input new role for employee
                        // console.log(answers);
                        let employeeId = answers.employee;
                        inquirer.prompt([
                            {
                                type: "number",
                                name: "roleId",
                                message: "input new role ID for employee",
                            }
                        ]).then((answers) => {
                            
                            let newRoleId = answers.roleId;
                            updateEmployeeRole(connection, employeeId, newRoleId);

                        })

                    });
        
                    

                }
            });
            
            
        break;
        
        default:
            console.log("choice invalid");
        break;
    }

    // pass its results into console.table to output formatted data to the console

});
