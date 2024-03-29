import { Request, Response } from "express";
import { eq } from "drizzle-orm";

import { db } from "../db";
import { insertPostSchema, NewPost, Post, postsModel } from "../db/schema";

export async function getPost(req: Request, res: Response): Promise<Response> {
  try {
    const { id } = req.params;

    // This is an alternative way of doing it
    // const allPosts: Post[] = await db
    //   .select()
    //   .from(postsModel)
    //   .where(eq(postsModel.id, id));
    // if (allPosts.length < 1) {
    //   return res.status(404).send({ message: 'Post with that id not found' });
    // }

    const post = await db.query.postsModel.findFirst({
      where: eq(postsModel.id, id),
    });

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
  const allPosts: Post[] = await db.select().from(postsModel);
  return res.send(allPosts);
}

export async function createPost(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const { title, content, authorId } = req.body;

    const newPost = insertPostSchema.parse({ title, content, authorId });

    const results: NewPost[] = await db
      .insert(postsModel)
      .values(newPost)
      .returning();

    if (!results || results.length < 1) {
      return res.status(500).send({ message: "Post could not be created." });
    }

    return res.send(results[0]);
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

    const post = insertPostSchema
      .partial({ title: true, content: true })
      .parse({ title, content });

    const updatedPosts: Post[] = await db
      .update(postsModel)
      .set(post)
      .where(eq(postsModel.id, id))
      .returning();

    if (!updatedPosts || updatedPosts.length < 1) {
      return res.status(404).send({ message: "Post could not be found." });
    }

    return res.send(updatedPosts[0]);
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

    const deletedPosts = await db
      .delete(postsModel)
      .where(eq(postsModel.id, id))
      .returning({ id: postsModel.id });

    if (!deletedPosts || deletedPosts.length < 1) {
      return res.status(404).send({ message: "Post could not be found." });
    }

    return res.send({ deletedPost: deletedPosts[0] });
  } catch (e) {
    console.log(e);
    return res.status(500).send({ message: "Error encountered" });
  }
}
