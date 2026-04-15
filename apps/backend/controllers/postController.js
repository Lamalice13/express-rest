import { prisma, Prisma } from "../lib/prisma.js";

async function postPost(req, res) {
  try {
    const { title, text } = req.body;
    const { id } = req.user;
    const blog = await prisma.post.create({
      data: {
        userId: id,
        title,
        text,
      },
      select: {
        title: true,
        text: true,
      },
    });
    res.json({ blog });
  } catch (err) {
    res.status(503);
  }
}

async function patchPost(req, res) {
  try {
    const { title, text } = req.body;
    const { id } = req.params;

    if (!title && !text) {
      return res
        .status(400)
        .json({ error: "Au moins un champ est requis (title ou text)" });
    }

    const post = await prisma.post.update({
      where: {
        id: Number(id),
        authorId: req.user.id,
      },
      data: {
        title: title !== undefined ? title : Prisma.skip,
        text: text !== undefined ? text : Prisma.skip,
      },
      select: {
        title: title !== undefined ? true : false,
        text: text !== undefined ? true : false,
      },
    });
    return res.json(post);
  } catch (err) {
    console.log(err);
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
        userId: req.user.id,
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
    console.log(err);
    res.sendStatus(err);
  }
}

async function getAllPosts(req, res) {
  try {
    const posts = await prisma.post.findMany({
      where: {
        published: true,
      },
      select: {
        title: true,
        timestamp: true,
        id: true,
        text: true,
        user: {
          select: {
            username: true,
          },
        },
        comments: {
          select: {
            text: true,
            timestamp: true,
            id: true,
          },
        },
      },
    });
    return res.json({ posts });
  } catch (err) {
    return res.sendStatus(503);
  }
}

export { postPost, patchPost, deletePost, getPost, getAllPosts };
