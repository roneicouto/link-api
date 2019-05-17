// Update with your config settings.

module.exports = {

    client: 'postgresql',
    connection: {
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'icomp',
      password: process.env.DB_PASSWORD || 'icompdbpw',
      database: process.env.DB_DATABASE || 'info',
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

