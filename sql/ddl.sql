-- Create the Employee Table
CREATE TABLE Employee (
    Employee_ID INT PRIMARY KEY,
    First_Name VARCHAR(50) NOT NULL,
    Last_Name VARCHAR(50) NOT NULL,
    Department VARCHAR(50),
    Salary DECIMAL(10, 2)
);

-- Create the Customer Table
CREATE TABLE Customer (
    Customer_ID INT PRIMARY KEY,
    Customer_Name VARCHAR(100) NOT NULL,
    City VARCHAR(50),
    Sales_Rep_ID INT,
    FOREIGN KEY (Sales_Rep_ID) REFERENCES Employee(Employee_ID)
);

-- Add a new column 'Hire_Date' to the Employee table
ALTER TABLE Employee
ADD Hire_Date DATE;

-- TRUNCATE: Removes all rows from a table, but keeps the table structure.
TRUNCATE TABLE Customer;

-- DROP: Removes the entire table from the database (structure and data).
-- (Uncomment the line below to execute)
DROP TABLE Customer;
