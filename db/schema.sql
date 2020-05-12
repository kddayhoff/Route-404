-- Drops the route_db if it exists currently --
DROP DATABASE IF EXISTS route_db;
-- Creates the "route_db" database --
CREATE DATABASE route_db;

USE route_db;
--populates from input -- city and state are from user input, lat and lon are pulled from city and state that user inputs
CREATE TABLE destination (
    id INT NOT NULL AUTO_INCREMENT,
    lat DECIMAL(30) NOT NULL, 
    lon DECIMAL (30) NOT NULL,
    city VARCHAR(50),
    st VARCHAR(20),
    PRIMARY KEY(id, lat, lon)
) ENGINE = INNODB;    

--Creates user from sign in page, will create unique user ID with UUID package that will be stored to this table
--will need to hide/hashout password
CREATE TABLE user (
    id INT NOT NULL AUTO_INCREMENT,
    user_email VARCHAR(100) NOT NULL,
    user_pass VARCHAR(100) NOT NULL,
    PRIMARY KEY(id)
) ENGINE = INNODB;

--user destination, dest_id, _lat, _lon. This ends up being the "master" table where we can reference the user and the data associated with them 
CREATE TABLE user_dest (
    ud INT NOT NULL AUTO_INCREMENT,
    destination_id INT NOT NULL,
    destination_lat DECIMAL(30),
    destination_lon DECIMAL(30),
    user_id INT NOT NULL,
    PRIMARY KEY(ud),
    INDEX (destination_id ,destination_lat, destination_lon),
    INDEX (user_id),
    FOREIGN KEY (destination_id ,destination_lat, destination_lon)
        REFERENCES destination(id, lat, lon)
        ON UPDATE CASCADE ON DELETE RESTRICT,
    FOREIGN KEY (user_id)
        REFERENCES user(id)    

) ENGINE = INNODB;

