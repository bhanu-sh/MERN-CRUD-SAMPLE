import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send({ message: "Access denied. No token provided." });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Make sure to have a secret key for signing tokens
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send({ message: "Invalid token." });
  }
};

export default authMiddleware;