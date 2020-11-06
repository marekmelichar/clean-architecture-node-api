import { Config } from 'knex';
import { config as c } from './src/infrastructure';

const config: Config = {
  client: 'mysql',
  connection: {
    host: c.db.host,
    port: c.db.port,
    user: c.db.user,
    password: c.db.password,
    database: c.db.database,
  },
};

module.exports = config;
