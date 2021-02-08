// Update with your config settings.
require('dotenv').config();

let connection = {
  user : process.env.DATABASE_USER,
  password : process.env.DATABASE_PASSWORD,
  database : process.env.DATABASE_NAME
}
if (process.env.DATABASE_SOCKET) {
  connection.socketPath = process.env.DATABASE_SOCKET
} else {
  connection.host = process.env.DATABASE_HOST
}
console.log(connection)
module.exports = {
      client: 'mysql',
      connection,
      migrations: {
        tableName: 'knex_migrations'
      }
  }
