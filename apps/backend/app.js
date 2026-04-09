import express from "express";
import "dotenv/config";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/login", (req, res) => {});

app.listen(3000, (err) => {
  if (err) return console.error(err);
  console.log(`Server running on 3000`);
});
