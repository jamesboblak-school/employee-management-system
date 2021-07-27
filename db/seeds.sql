INSERT INTO departments(departmentName)
VALUES  ("Engineering"),
        ("Finince"),
        ("Legal"),
        ("Sales");

INSERT INTO roles(roleName)
VALUES  ("Accountant"),
        ("Account Manager"),
        ("Lawyer"),
        ("Lead Engineer"),
        ("Legal Team Lead"),
        ("Salesperson"),
        ("Software Engineer");

INSERT INTO employees(lastName, firstName, salary, manager_id, eRole)
VALUES  ("Boblak", "James", 100000, 1, "Salesperson"),
        ("Cottrell", "Emma", 200000, 1, "Lead Engineer"),
        ("Mercury", "Freddie", 300000, 2, "Legal Team Lead");

INSERT INTO managers(lastName, firstName, salary)
VALUES  ("Biden", "Joe", 50000),
        ("Harris", "Kam", 60000),
        ("Albigot", "Fred", 70000);