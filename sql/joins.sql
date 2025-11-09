-- INNER JOIN (Only returns rows with matching Sales_Rep_ID and Employee_ID)
SELECT
    C.Customer_Name,
    C.City,
    E.First_Name AS Sales_Rep
FROM
    Customer C
INNER JOIN
    Employee E ON C.Sales_Rep_ID = E.Employee_ID;


-- LEFT JOIN (Returns all customers, and the matching employee data if available)
SELECT
    C.Customer_Name,
    E.First_Name AS Sales_Rep
FROM
    Customer C
LEFT JOIN
    Employee E ON C.Sales_Rep_ID = E.Employee_ID;


-- RIGHT JOIN (Returns all employees, and the matching customer data if available)
SELECT
    E.First_Name AS Sales_Rep,
    C.Customer_Name
FROM
    Customer C
RIGHT JOIN
    Employee E ON C.Sales_Rep_ID = E.Employee_ID;


-- FULL OUTER JOIN (Returns all rows from both tables, filling NULLs where no match exists)
-- Note: This syntax may vary (e.g., MySQL requires UNION of LEFT and RIGHT joins).
SELECT
    C.Customer_Name,
    E.First_Name AS Sales_Rep
FROM
    Customer C
FULL OUTER JOIN
    Employee E ON C.Sales_Rep_ID = E.Employee_ID;



