import express from "express";
import "dotenv/config";

const app = express();
app.use(express.json());

app.listen(3000, (err) => {
  if (err) return console.error(err);
  console.log(`Server running on 3000`);
});
