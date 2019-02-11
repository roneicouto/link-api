const { Pool } = require('pg')
const types = require('pg').types

types.setTypeParser(1700, parseFloat) 

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'icomp',
  password: process.env.DB_PASSWORD || 'icompdbpw',
  database: process.env.DB_DATABASE || 'info',
  port: process.env.DB_PORT || 5432,
  max: process.env.DB_MAX_POOL || 20,
  idleTimeoutMillis: process.env.DB_TIMEOUT_POOL || 30*60*1000,
  connectionTimeoutMillis: process.env.DB_TIMEOUT_CONN || 30*1000
})

module.exports = {

  query: (cmdSql, params, callback) => {
    return callback ? pool.query(cmdSql, params, callback) : pool.query(cmdSql, params)
  },

  client: () => {
    return pool.connect()  // retorna uma promise
  }

}  
