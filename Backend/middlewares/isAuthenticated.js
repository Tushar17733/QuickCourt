import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

const isAuthenticated = async (req, res, next) => {
  try {
    // Check for token in cookies first, then in Authorization header
    let token = req.cookies.token;
    
    if (!token) {
      // Check Authorization header
      const authHeader = req.headers.authorization;
      if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.substring(7); // Remove 'Bearer ' prefix
      }
    }

    if (!token) {
      return res.status(401).json({
        message: "User not authenticated",
        success: false,
      });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    if (!decoded) {
      return res.status(401).json({
        message: "Invalid token",
        success: false,
      });
    }

    // Fetch the user and store in req.user
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    req.user = user; // store full user object
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Authentication error" });
  }
};

export default isAuthenticated;
