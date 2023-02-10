import express from "express";
const app = express();
import mysql from "mysql";
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const PORT = 5000;
app.get("/api/hello", (req, res) => {
  // res.status(200).json(true});
  res.status(200).json({ data: true });
});

app.listen(PORT, () =>
  console.log("Express server listening on http port: " + PORT)
);
