## Prerequisite

- Install Node.js
- Install npm
- Install mysql-server

## Configuration & API Installation

- clone this repo locally
- run `npm install` to install all dependencies
- Create a config file using ormconfig_example.json (remove the '\_example' from 'ormconfig_example.json')
- choose your database username
- choose your database password
- choose the name of your database
- open database `mysql -u root -p`
- log in with your password
- create a new database with the name chosen before `create database [name_of_your_database];`
- connect to the database `use [name_of_your_database];`
- create another config file, name it config.json
- in config.json, add the following content :
  {
  "globalPrefix" : "[your_subdirectory]"
  }
  (replace "[your_subdirectory]" with the desired subdirectory in which you want to deploy the project.)
- make sure [your_subdirectory] is empty if you want to run your project on localhost.

- run `npm run start:dev` to start developing

Created using [Nest](https://github.com/nestjs/nest)
