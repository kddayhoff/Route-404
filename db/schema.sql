
-- DROP DATABASE IF EXISTS route_db;
-- -- Creates the "route_db" database --
-- CREATE DATABASE route_db;

-- USE route_db;

-- CREATE TABLE destination (
--     id INT NOT NULL AUTO_INCREMENT,
--     lat DECIMAL(30) NOT NULL, 
--     lon DECIMAL (30) NOT NULL,
--     city VARCHAR(50),
--     st VARCHAR(20),
--     PRIMARY KEY(id, lat, lon)
-- ) ENGINE = INNODB;    

-- CREATE TABLE user (
--     id INT NOT NULL AUTO_INCREMENT,
--     user_name VARCHAR(100) NOT NULL,
--     user_pass VARCHAR(100) NOT NULL,
--     PRIMARY KEY(id)
-- ) ENGINE = INNODB;

-- CREATE TABLE user_dest (
--     ud INT NOT NULL AUTO_INCREMENT,
--     destination_id INT NOT NULL,
--     destination_lat DECIMAL(30),
--     destination_lon DECIMAL(30),
--     user_id INT NOT NULL,
--     PRIMARY KEY(ud),
--     INDEX (destination_id ,destination_lat, destination_lon),
--     INDEX (user_id),
--     FOREIGN KEY (destination_id ,destination_lat, destination_lon)
--         REFERENCES destination(id, lat, lon)
--         ON UPDATE CASCADE ON DELETE RESTRICT,
--     FOREIGN KEY (user_id)
--         REFERENCES user(id)    

-- ) ENGINE = INNODB;

