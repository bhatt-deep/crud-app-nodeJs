# Course Project

# Complete Project
**Setup**
1) Clone this repository to your local machine.
2) Run `npm install` to ensure all dependencies are installed.
3) Create a mysql database.
4) Setup `.env` file with below variables.
- DB_HOST
- DB_USER
- DB_PASSWORD
- DB_NAME
- PORT
- JWT_SECRET
5) run the migrations.
`node_modules/.bin/knex --esm migrate:latest`
6) Run `npm start` to run the script.
7) Run `npm test` to run the test cases.

**REST API list**
1) POST : /users
2) GET : /users
3) GET : /users/:id
4) PUT : /users/:id
5) POST : /entries
6) GET : /entries **(Protected)**
7) GET : /entries/:id **(Protected)**
8) PUT : /entries/:id **(Protected)**

The Protected APIs required `bearer token` to execute.
