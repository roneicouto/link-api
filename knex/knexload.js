const types = require('pg').types

types.setTypeParser(1700, parseFloat) 

const config = require('./knexfile')
const knex = require('knex')(config)

module.exports = knex

