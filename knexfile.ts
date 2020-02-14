import * as knex from 'knex';

export const development: knex.Config = {
  client: 'sqlite3',
  connection: {
    filename: './src/database/projects.db',
  },
  useNullAsDefault: true,
  migrations: {
    directory: './src/database/migrations',
  },
  seeds: {
    directory: './src/database/seeds',
  },
  pool: {
    afterCreate: (conn, done) => {
      conn.run('PRAGMA foreign_keys = ON', done);
    },
  },
};

export const db = knex(development);
