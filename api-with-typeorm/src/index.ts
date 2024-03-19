import { AppDataSource } from "./data-source";
import { User } from "./entity/User";

import express, { Express, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";

import "dotenv/config";

import { router as postsRouter } from "./routes/posts";
import { router as usersRouter } from "./routes/users";

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ credentials: false }));

if (process.env.NODE_ENV === "DEV") {
  app.use(morgan("dev"));
}

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

const API_PREFIX = "/api";
app.use(`${API_PREFIX}/posts`, postsRouter);
app.use(`${API_PREFIX}/users`, usersRouter);

AppDataSource.initialize()
  .then(async () => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });

    console.log("Database connected");
  })
  .catch((error) => console.log(error));
