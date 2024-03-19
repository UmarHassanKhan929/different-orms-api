import express, { Express, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import "dotenv/config";

import { router as postsRouter } from "./routes/posts";
import { router as usersRouter } from "./routes/users";
import db from "./database/db";

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ credentials: false }));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

db.authenticate()
  .then(() => console.log("🚀 Database connected!"))
  .catch((err) => console.log(`🚀 Database connection error: ${err}`));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

const API_PREFIX = "/api";
app.use(`${API_PREFIX}/posts`, postsRouter);
app.use(`${API_PREFIX}/users`, usersRouter);

app.listen(port, () =>
  console.log(`🚀 Server listening at http://localhost:${port}`)
);
