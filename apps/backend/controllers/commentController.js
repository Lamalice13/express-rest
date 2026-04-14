import { prisma } from "../lib/prisma.js";

async function postComment(req, res) {
  const { id: postId } = req.params;
  try {
    const comment = await prisma.comment.create({
      data: {
        text: req.body.text,
        postId: Number(postId),
      },
      select: {
        text: true,
        timestamp: true,
      },
    });
    res.json({ comment });
  } catch (err) {
    console.log(err);
    res.sendStatus(503);
  }
}

export { postComment };
