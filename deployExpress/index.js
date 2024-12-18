import express from "express";
import { handler } from "../build/handler.js";

const app = express();
const port = 3000;

app.get("/express", (req, res) => {
  res.send("Hello World!");
});

app.use(handler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
