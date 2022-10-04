-- seed departments
INSERT INTO department (name)
VALUES
    ("IT"),
    ("Marketing"),
    ("HR");

-- seed roles applying existing departments
INSERT INTO role (title, salary, department_id)
VALUES
    ("Systems Administrator", 150000, 1),
    ("Assistant Systems Administrator", 60000, 1),
    ("Helpdesk Admin", 50000, 1),
    ("Marketing Manager", 100000, 2),
    ("Marketing Lead", 80000, 2),
    ("Marketing Intern", 0, 2),
    ("HR Manager", 12000, 3),
    ("Accounting", 90000, 3);

-- seed managers as some employees
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ("Milli", "Hopper", 1, NULL),
    ("Abel", "Stout", 4, NULL),
    ("Charlene", "Cervantes", 6, NULL),
    -- seed rest of employees, applying existing roles to them
    ("Adelina", "Paine", 2, 1),
    ("Rowan", "Mccann", 3, 1),
    ("Hilda", "Tucker", 3, 1),
    ("Ela", "Webster", 5, 2),
    ("Faizan", "Pacheco", 6, 2),
    ("Jamelia", "Mcleod", 6, 2),
    ("Patricia", "Wallace", 7, 3);
