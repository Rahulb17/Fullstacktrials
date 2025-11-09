-- Start a transaction
START TRANSACTION;

-- Perform a DML operation
UPDATE Employee
SET Salary = 80000.00
WHERE Employee_ID = 104;

-- SAVEPOINT: Creates a point within the transaction to which you can roll back.
SAVEPOINT before_delete;

-- Perform another DML operation
DELETE FROM Customer WHERE Customer_ID = 2;

-- ROLLBACK: Undoes all changes back to the last COMMIT or START TRANSACTION.
 ROLLBACK;

-- ROLLBACK to SAVEPOINT: Undoes changes only back to the specified savepoint.
ROLLBACK TO before_delete;

-- COMMIT: Makes the changes permanent.
COMMIT;
