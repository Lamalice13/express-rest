import express from "express";
import "dotenv/config";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const allowedOrigin = process.env.ALLOWED_ORIGIN.split(",") || [];

const corsOptions = {
  origin: allowedOrigin,
  credentials: true,
};
app.use(cors(corsOptions));

app.post("/login", (req, res) => {});

app.listen(process.env.PORT || 3000, (err) => {
  if (err) return console.error(err);
  console.log(`Server running on 3000`);
});
