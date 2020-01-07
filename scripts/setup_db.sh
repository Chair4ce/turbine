#!/usr/bin/env bash
mysql -u root -e "create database turbinedev;"
mysql -u root -e "create user 'turbine'@'localhost';"
mysql -u root -e "GRANT ALL PRIVILEGES ON turbinedev.* TO 'turbine'@'localhost';"
