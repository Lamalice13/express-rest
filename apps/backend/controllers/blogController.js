import { prisma } from "../lib/prisma.js";

async function postBlog(req, res) {
  try {
    const { title } = req.body;
    const { id } = req.user;
    const blog = await prisma.post.create({
      data: {
        userId: id,
        title,
      },
      select: {
        title: true,
        text: true,
      },
    });
    res.json({ blog });
  } catch (e) {
    res.sendStatus(503);
  }
}

async function patchBlog(req, res) {}

export { postBlog };
