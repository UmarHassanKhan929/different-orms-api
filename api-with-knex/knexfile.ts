import type { Knex } from "knex";
import "dotenv/config";
// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  DEV: {
    client: "pg",
    connection: process.env.DB_URL,
    migrations: {
      directory: "./db/migrations",
    },
  },

  STAGE: {
    client: "pg",
    connection: process.env.DB_URL,
    migrations: {
      directory: "./db/migrations",
    },
  },

  PROD: {
    client: "pg",
    connection: process.env.DB_URL,
    migrations: {
      directory: "./db/migrations",
    },
  },
};

module.exports = config;

export default config;
