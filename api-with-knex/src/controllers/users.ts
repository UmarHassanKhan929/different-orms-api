import { Request, Response } from "express";
import db from "../../db/db";

export async function createUser(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const { name } = req.body;

    const results = db("users").insert({ name });

    if (!results) {
      return res.status(500).send({ message: "User could not be created." });
    }

    return res.send(results);
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

    const user = await db("users")
      .join("posts", "users.id", "=", "posts.author_id")
      .where("users.id", id)
      .select(
        "users.*",
        "posts.title as postTitle",
        "posts.content as postContent",
        "posts.created_at as postCreatedAt"
      );

    if (!user) {
      return res.status(404).send({ message: "User with that id not found" });
    }

    const userResult = {
      id: user[0].id,
      name: user[0].name,
      posts: user.map((row) => ({
        title: row.postTitle,
        content: row.postContent,
        created_at: row.postCreatedAt,
      })),
    };

    return res.send({ user: userResult });
  } catch (e) {
    console.log(e);
    return res.status(500).send({ message: "Error encountered" });
  }
}
