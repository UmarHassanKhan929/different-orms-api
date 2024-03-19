import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { Post } from "../entity/Post";

export async function createUser(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const { name } = req.body;

    const userRepository = AppDataSource.getRepository(User);

    const newUser = new User();

    newUser.name = name;

    const results = await userRepository.save(newUser);

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

    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOne({
      where: { id },
      relations: ["posts"],
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
