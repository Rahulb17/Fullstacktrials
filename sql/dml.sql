-- Insert data into Employee
INSERT INTO Employee (Employee_ID, First_Name, Last_Name, Department, Salary, Hire_Date) VALUES
(101, 'Alice', 'Smith', 'Sales', 60000.00, '2020-01-15'),
(102, 'Bob', 'Johnson', 'Marketing', 55000.00, '2021-03-20'),
(103, 'Charlie', 'Brown', 'Sales', 65000.00, '2019-11-01'),
(104, 'David', 'Lee', 'IT', 75000.00, '2022-07-28');

-- Insert data into Customer
INSERT INTO Customer (Customer_ID, Customer_Name, City, Sales_Rep_ID) VALUES
(1, 'Alpha Corp', 'New York', 101),
(2, 'Beta Solutions', 'Chicago', 103),
(3, 'Gamma Inc', 'New York', 101),
(4, 'Delta Co', 'Boston', 102),
(5, 'Epsilon Ltd', 'Los Angeles', NULL), -- Customer with no sales rep
(6, 'Zeta Group', 'Miami', 999); -- Customer with invalid sales rep ID (depends on foreign key enforcement)


-- Give all 'Sales' employees a 5% raise
UPDATE Employee
SET Salary = Salary * 1.05
WHERE Department = 'Sales';

-- Delete the customer with no assigned Sales Representative
DELETE FROM Customer
WHERE Sales_Rep_ID IS NULL;

-- Select all data from Employee
SELECT * FROM Employee;

-- Select all data from Customer
SELECT * FROM Customer;


