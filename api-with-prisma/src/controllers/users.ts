import { Request, Response } from "express";
import { Posts, PrismaClient, PrismaPromise, Users } from "@prisma/client";

const prisma = new PrismaClient();

export async function createUser(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const { name } = req.body;

    const results = await prisma.users.create({
      data: {
        name,
      },
    });

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

    const user = await prisma.users.findFirst({
      where: { id },
      include: {
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
