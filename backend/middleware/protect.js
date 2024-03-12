const jwt = require("jsonwebtoken");

exports.protect = async (req, res, next) => {
  // Get token from request headers
  const authHeader = req.headers.authorization;

  // Check if token exists
  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized - Token missing" });
  }

  // Extract token from Authorization header
  const token = authHeader.split(" ")[1];

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user object to request
    next(); // Call next middleware
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(403).json({ message: "Forbidden - Invalid token" });
  }
};
