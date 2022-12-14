const express = require("express");

const app = express();

app.use(express.json());
app.post("/users", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.sendStatus(400);
  }
  res.send({ username });
});

module.exports = app;
