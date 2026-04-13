import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma.js";

export async function register(req, res) {
  try {
    const { email, username, password } = req.body;
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
    req.logIn(user, { session: false }, (e) => {
      if (e) return res.sendStatus(503);
      const token = signToken(user.id);
      return res.json({ token });
    });
  } catch (err) {
    return res.sendStatus(503);
  }
}
