// Update with your config settings.

module.exports = {

    client: 'postgresql',
    connection: {
      host: process.env.DB_HOST || 'nlinkdb.crbepnydsmvc.us-east-1.rds.amazonaws.com',
      user: process.env.DB_USER || 'nlink',
      password: process.env.DB_PASSWORD || 'nlinkdbpw',
      database: process.env.DB_DATABASE || 'apilink',
      port: process.env.DB_PORT || 5432
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }

};

