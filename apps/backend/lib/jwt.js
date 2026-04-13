import jwt from "jsonwebtoken";

function signToken(userId) {
  return jwt.sign(
    {
      id: userId,
    },
    process.env.SECRET_KEY,
    { expiresIn: "7d" },
  );
}

export { signToken };
