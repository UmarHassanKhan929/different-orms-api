import { Request, Response } from "express";
import { Post } from "../../models/posts";

export async function getPost(req: Request, res: Response): Promise<Response> {
  try {
    const { id } = req.params;

    const post = await Post.findOne({ where: { id } });

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
  const allPosts = await Post.findAll();
  return res.send(allPosts);
}

export async function createPost(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const { title, content, author_id } = req.body;

    const results = await Post.create({ title, content, authorId: author_id });

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

    const updatedPosts = await Post.update(
      { title, content },
      { where: { id } }
    );

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

    const deletedPosts = await Post.destroy({ where: { id } });

    if (!deletedPosts) {
      return res.status(404).send({ message: "Post could not be found." });
    }

    return res.send({ deletedPost: deletedPosts });
  } catch (e) {
    console.log(e);
    return res.status(500).send({ message: "Error encountered" });
  }
}
