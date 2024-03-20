import knex from "knex";

import config from "../knexfile";

const environment = process.env.NODE_ENV || "DEV";

const db = knex(config[environment]);

export default db;
