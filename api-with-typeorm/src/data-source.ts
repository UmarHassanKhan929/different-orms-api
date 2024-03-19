import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Post } from "./entity/Post";
import "dotenv/config";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT!),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: process.env.NODE_ENV === "dev" ? false : false,
  logging: process.env.NODE_ENV === "dev" ? false : false,
  entities: [User, Post],
  migrations: [__dirname + "/migration/*.ts"],
  subscribers: [],
});
