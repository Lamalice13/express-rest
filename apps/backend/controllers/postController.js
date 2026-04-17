import { prisma, Prisma } from "../lib/prisma.js";
import jwt from "jsonwebtoken";

async function postPost(req, res) {
  try {
    const { title, text } = req.body;
    const { id } = req.user;

    await prisma.post.create({
      data: {
        userId: id,
        title,
        text,
      },
    });
    return res.sendStatus(200);
  } catch (err) {
    return res.sendStatus(503);
  }
}

async function patchPost(req, res) {
  try {
    const { text } = req.query;
    const { id } = req.params;

    const currentPost = await prisma.post.findUnique({
      where: { id: Number(id) },
      select: { published: true },
    });

    const post = await prisma.post.update({
      where: {
        id: Number(id),
      },
      data: {
        ...(text && { text }),
        ...(!text && { published: !currentPost.published }),
      },
      select: {
        ...(!text && { published: true }),
        ...(text && { text: true }),
      },
    });

    return res.json(post);
  } catch (err) {
    if (err.code === "P2025") {
      // Prisma : record not found
      return res.status(404).json({ error: "Post introuvable" });
    }
    return res.sendStatus(503);
  }
}

async function deletePost(req, res) {
  try {
    await prisma.post.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    return res.sendStatus(200);
  } catch (err) {
    return res.sendStatus(503);
  }
}

async function getPost(req, res) {
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: Number(req.params.id),
      },
      include: {
        comments: true,
      },
    });
    res.json({ post });
  } catch (err) {
    res.sendStatus(err);
  }
}

async function getAllPosts(req, res) {
  const { include } = req.query;
  const token = req.headers.authorization?.split(" ")[1];
  let isUserAuth = false;

  if (token) {
    isUserAuth = jwt.verify(token, process.env.SECRET_KEY);
  }

  try {
    const posts = await prisma.post.findMany({
      ...(!isUserAuth && {
        where: {
          published: true,
        },
      }),
      select: {
        title: true,
        timestamp: true,
        id: true,
        text: true,
        published: true,
        user: {
          select: {
            username: true,
          },
        },
        ...(include && {
          comments: {
            select: {
              text: true,
              timestamp: true,
              id: true,
            },
          },
        }),
      },
    });

    return res.json({ posts });
  } catch (err) {
    return res.sendStatus(503);
  }
}

export { postPost, patchPost, deletePost, getPost, getAllPosts };
