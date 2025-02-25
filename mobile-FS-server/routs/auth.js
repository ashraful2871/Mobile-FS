const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.get("/me", (req, res) => {
  const token = req.cookies?.token;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    res.json(decoded); // Send user data
  } catch (error) {
    res.status(401).json({ message: "Invalid Token" });
  }
});

module.exports = router;
