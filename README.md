## Prerequisite

- Install Node.js
- Install npm
- Install mysql-server

## Configuration & API Installation

- clone this repo locally
- run `npm install` to install all dependencies
- Create a config file using ormconfig_example.json (remove the '_example' from 'ormconfig_example.json')
- choose your db username
- choose your db password
- choose the name of your db
- create a new database with the name chosen before
- connect to the database
- run `npm install` at the root of the project
- run `systemctl start mysql` to start Mysql DB
- run `npm run start:dev` to start developing


Created using [Nest](https://github.com/nestjs/nest)
