import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { Post } from "../entity/Post";

export async function getPost(req: Request, res: Response): Promise<Response> {
  try {
    const { id } = req.params;

    const postRepository = AppDataSource.getRepository(Post);

    const post = await postRepository.findOne({
      where: { id },
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
  try {
    const postRepository = AppDataSource.getRepository(Post);

    const allPosts = await postRepository.find();

    return res.send(allPosts);
  } catch (e) {
    console.log(e);
    return res.status(500).send({ message: "Error encountered" });
  }
}

export async function createPost(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const { title, content, author_id } = req.body;

    const postRepository = AppDataSource.getRepository(Post);

    const newPost = new Post();

    newPost.title = title;
    newPost.content = content;
    newPost.authorId = author_id;

    const results = await postRepository.save(newPost);

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

    const postRepository = AppDataSource.getRepository(Post);

    const post = await postRepository.findOne({
      where: { id },
    });

    if (!post) {
      return res.status(404).send({ message: "Post could not be found." });
    }

    post.title = title;
    post.content = content;

    const updatedPost = await postRepository.save(post);

    if (!updatedPost) {
      return res.status(404).send({ message: "Post could not be found." });
    }

    return res.send(updatedPost);
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

    const postRepository = AppDataSource.getRepository(Post);

    const post = await postRepository.findOne({
      where: { id },
    });

    if (!post) {
      return res.status(404).send({ message: "Post could not be found." });
    }

    await postRepository.remove(post);

    return res.send({ deletedPost: post });
  } catch (e) {
    console.log(e);
    return res.status(500).send({ message: "Error encountered" });
  }
}
