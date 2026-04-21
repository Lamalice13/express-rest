import express from "express";
import "dotenv/config";
import "./config/passport.js";
import cors from "cors";
import { authRouter } from "./routes/authRouter.js";
import { postRouter } from "./routes/postRouter.js";

// APP
const app = express();

// CORS
const allowedOrigins =
  process.env.ALLOWED_ORIGIN?.split(",").map((o) => o.trim()) || [];

const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
};
app.use(cors(corsOptions));

// PARSER
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTES
app.use("/auth", authRouter);
app.use("/posts", postRouter);

app.listen(process.env.PORT || 3000, (err) => {
  if (err) return console.error(err);
  console.log(`Server running on 3000`);
});
