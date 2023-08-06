import jwt from "jsonwebtoken";

export async function verifyToken(req, res, next) {
  try {
    let token = req.header("Authorization");

    if (!token) {
      return res.status(403).send("Access Denied");
    }

    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }

    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);

    req.user = verifiedToken;

    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
