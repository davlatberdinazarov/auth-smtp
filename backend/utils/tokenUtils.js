// TokenUtils.js
const jwt = require("jsonwebtoken");

class TokenUtils {
  // Generate an access token
  static generateAccessToken(payload) {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
  }

  // Generate a refresh token
  static generateRefreshToken(payload) {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
  }

  // Verify a token
  static verifyToken(token, secret) {
    try {
      return jwt.verify(token, secret);
    } catch (error) {
      throw new Error("Token verification failed");
    }
  }
}

module.exports = TokenUtils;