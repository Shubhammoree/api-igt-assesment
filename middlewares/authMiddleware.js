const jwt = require("jsonwebtoken");

module.exports.verifyToken = (req, res, next) => {
  let token = req.header("Authorization") || "";
  if (!token) return res.status(401).json({ message: "Access denied" });
  token = token.split(" ")[1];

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid token" });
  }
};
