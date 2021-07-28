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
VALUES  ("Boblak", "James", 100000, 1003, "Salesperson"),
        ("Cottrell", "Emma", 200000, 1001, "Lead Engineer"),
        ("Mercury", "Freddie", 300000, 1002, "Legal Team Lead");

INSERT INTO managers(lastName, firstName, salary, id)
VALUES  ("Biden", "Joe", 50000, 1001),
        ("Harris", "Kam", 60000, 1002),
        ("Albigot", "Fred", 70000, 1003);