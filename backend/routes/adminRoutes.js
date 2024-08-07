const express = require("express");
const router = express.Router();

router.post("/login", function (req, res) {
  const { username, password } = req.body;
  if (username == "admin" && password == "admin") {
    return res.status(200).json({ message: "Logged In" });
  }
  return res.status(401).json({ message: "Unauthorrized" });
});

module.exports = router;
