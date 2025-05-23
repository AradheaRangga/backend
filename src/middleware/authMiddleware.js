import jwt from "jsonwebtoken";
import { checkBlacklistedToken } from "../controller/token.js";

export const authMiddleware = async (req, res, next) => {
  try {
    let token = req.headers["authorization"]?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ message: "token salah" });
    }
    const isBlacklisted = await checkBlacklistedToken(token);
    if (isBlacklisted) {
      return res
        .status(401)
        .json({ message: "Token is Blaclisted, please login again" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    req.user = decoded;
    console.log("req.user", req.user);

    const userId = req.user.id;
    console.log("userId", userId);
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token Expired" });
    }
    return res.status(401).json({ message: "Unauthorized" });
  }
};
