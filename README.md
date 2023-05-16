## Prerequisite

- Install Node.js
- Install npm
- Install mysql-server

## Configuration & API Installation

- clone this repo locally
- run `npm install` to install all dependencies
- Create a config file using ormconfig_example.json (remove the '_example' from 'ormconfig_example.json')
- choose your database username
- choose your database password
- choose the name of your database
- open database `mysql -u root -p`
- log in with your password
- create a new database with the name chosen before `create database [name_of_your_database];`
- connect to the database `use [name_of_your_database];`

- run `npm run start:dev` to start developing


Created using [Nest](https://github.com/nestjs/nest)
