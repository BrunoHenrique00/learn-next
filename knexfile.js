require('dotenv').config();

module.exports = {
    development: {
      client: 'pg',
      connection: process.env.DB_URL,
      migrations:{
        tableName: 'advogados_migrations',
        directory: `${__dirname}/src/database/migrations`
      }
    }
  }