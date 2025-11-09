-- GRANT: Grants specific permissions to a user.
GRANT SELECT, INSERT ON Customer TO 'new_user'@'localhost';

-- REVOKE: Removes specific permissions from a user.
REVOKE INSERT ON Customer FROM 'new_user'@'localhost';
