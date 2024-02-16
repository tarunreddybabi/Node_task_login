const express = require("express");
const { LocalStorage } = require("node-localstorage");
const app = express();

app.use(express.json());

const localStorage = new LocalStorage("./start");

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required" });
  }

  let users = localStorage.getItem("users");
  users = users ? JSON.parse(users) : [];

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({ error: "Invalid Credentials" });
  }

  res.json({ message: "Login Successfully" });
});

app.listen(2001, () => {
  console.log("Server is running");
});