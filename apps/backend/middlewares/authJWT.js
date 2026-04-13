import passport from "passport";

const requireAuth = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ message: info?.message });
    req.user = user;
    next();
  })(req, res, next);
};

export { requireAuth };
