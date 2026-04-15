import bcrypt from "bcryptjs";
import { signToken } from "../lib/jwt.js";
import { prisma } from "../lib/prisma.js";

export async function register(req, res) {
  try {
    const { email, username, password } = req.body;
    console.log(email, username, password);
    const user = await prisma.user.create({
      data: {
        email,
        username,
        password: await bcrypt.hash(password, 10),
      },
      select: {
        id: true,
        username: true,
        email: true,
        password: true,
      },
    });

    const token = signToken(user.id);
    return res.json({ token });
  } catch (err) {
    console.log(err);
    return res.sendStatus(503);
  }
}
