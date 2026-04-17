import passport from "passport";

const requireAuth = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.sendStatus(401);
    req.user = user;
    next();
  })(req, res, next);
};

export { requireAuth };
