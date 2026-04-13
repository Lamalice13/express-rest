import passport from "passport";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import { Strategy as passportLocal } from "passport-local";
import { prisma } from "../lib/prisma.js";
import bcrypt from "bcryptjs";

// LOGIN CHECKING
passport.use(
  new passportLocal(async (username, password, done) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          username,
        },
        select: {
          id: true,
          password: true,
        },
      });

      if (!user)
        return done(null, false, { message: "Incorrect username or password" });

      // const match = await bcrypt.compare(password, user.password);

      // if (!match)
      //   return done(null, false, { message: "Incorrect username or password" });

      return done(null, user);
    } catch (e) {
      done(e);
    }
  }),
);

// VERIFY JWT
const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = process.env.SECRET_KEY;

passport.use(
  new JWTStrategy(options, async (jwt_payload, done) => {
    // prisma query checking user exists in db
    const user = prisma.user.findUnique({
      where: {
        id: jwt_payload.id,
      },
    });
    if (err) return done(err, false);
    if (!user) return done(null, false);

    return done(null, user);
  }),
);
