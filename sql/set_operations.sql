-- UNION (Combines results and removes duplicates)
SELECT First_Name AS Name, 'Employee' AS Type FROM Employee
UNION
SELECT Customer_Name AS Name, 'Customer' AS Type FROM Customer;


-- UNION ALL (Combines all results, including duplicates)
SELECT First_Name AS Name, 'Employee' AS Type FROM Employee
UNION ALL
SELECT Customer_Name AS Name, 'Customer' AS Type FROM Customer;


-- INTERSECT (Returns only the rows that exist in both result sets)
-- Example: Find names that appear in both Employee First Names and Customer Names.
SELECT First_Name AS Name FROM Employee
INTERSECT
SELECT Customer_Name AS Name FROM Customer;


-- MINUS or EXCEPT (Returns rows from the first query that are not in the second query)
-- Example: Find Employee First Names that are NOT also Customer Names.
SELECT First_Name AS Name FROM Employee
EXCEPT
SELECT Customer_Name AS Name FROM Customer;
