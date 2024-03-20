import { Request, Response } from "express";
import db from "../../db/db";

export async function getPost(req: Request, res: Response): Promise<Response> {
  try {
    const { id } = req.params;

    const post = await db.select().from("posts").where("id", id);

    if (!post) {
      return res.status(404).send({ message: "Post with that id not found" });
    }

    return res.send(post);
  } catch (e) {
    console.log(e);
    return res.status(500).send({ message: "Error encountered" });
  }
}

export async function getPosts(req: Request, res: Response): Promise<Response> {
  const allPosts = await db.select().from("posts");
  return res.send(allPosts);
}

export async function createPost(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const { title, content, authorId } = req.body;

    const results = await db("posts").insert({
      title,
      content,
      author_id: authorId,
    });

    if (!results) {
      return res.status(500).send({ message: "Post could not be created." });
    }

    return res.send(results);
  } catch (e) {
    console.log(e);
    return res.status(500).send({ message: "Error encountered" });
  }
}

export async function updatePost(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const updatedPosts = await db("posts")
      .where("id", id)
      .update({ title, content });

    if (!updatedPosts) {
      return res.status(404).send({ message: "Post could not be found." });
    }

    return res.send(updatedPosts);
  } catch (e) {
    console.log(e);
    return res.status(500).send({ message: "Error encountered" });
  }
}

export async function deletePost(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const { id } = req.body;

    const deletedPosts = await db("posts").where("id", id).del();

    if (!deletedPosts) {
      return res.status(404).send({ message: "Post could not be found." });
    }

    return res.send({ deletedPost: deletedPosts });
  } catch (e) {
    console.log(e);
    return res.status(500).send({ message: "Error encountered" });
  }
}
