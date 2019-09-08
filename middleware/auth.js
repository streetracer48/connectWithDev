const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function(req, res, next) {
  // Get token from header
  const token = req.header("x-auth-token");

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }
  console.log(token);
  // Verify token
  try {
    const keys = config.get("SECRETKEYS");
    const decoded = jwt.verify(token, keys);

    req.user = decoded;
    console.log(req.user);
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
