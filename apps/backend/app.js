import express from "express";
import "dotenv/config";
import "./config/passport.js";
import cors from "cors";
import { authRouter } from "./routes/authRouter.js";
import { blogRouter } from "./routes/blogRouter.js";

// APP
const app = express();

// PARSER
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS
const allowedOrigin = process.env.ALLOWED_ORIGIN?.split(",") || [];
const corsOptions = {
  origin: allowedOrigin,
  credentials: true,
};
app.use(cors(corsOptions));

// ROUTES
app.use("/auth", authRouter);
app.use("/post", blogRouter);

app.listen(process.env.PORT || 3000, (err) => {
  if (err) return console.error(err);
  console.log(`Server running on 3000`);
});

// PATCH/GET blog + POST comments,
