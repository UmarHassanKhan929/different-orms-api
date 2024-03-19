import { Request, Response } from "express";
import { eq } from "drizzle-orm";

import { db } from "../db";
import { insertUserSchema, NewUser, usersModel } from "../db/schema";

export async function createUser(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const { name } = req.body;

    const newUser = insertUserSchema.parse({ name });

    const results: NewUser[] = await db
      .insert(usersModel)
      .values(newUser)
      .returning();

    if (!results || results.length < 1) {
      return res.status(500).send({ message: "User could not be created." });
    }

    return res.send(results[0]);
  } catch (e) {
    console.log(e);
    return res.status(500).send({ message: "Error encountered" });
  }
}

export async function getUserPosts(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const { id } = req.params;

    const user = await db.query.usersModel.findFirst({
      where: eq(usersModel.id, id),
      with: {
        posts: true,
      },
    });

    if (!user) {
      return res.status(404).send({ message: "User with that id not found" });
    }

    return res.send(user);
  } catch (e) {
    console.log(e);
    return res.status(500).send({ message: "Error encountered" });
  }
}
