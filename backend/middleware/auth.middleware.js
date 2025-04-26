const TokenUtils = require("../utils/tokenUtils");

const authMiddleware = (req, res, next) => {
  // Authorization headerni tekshirish
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Access denied" }); // Token mavjud emas
  }

  try {
    // Tokenni tasdiqlash
    const payload = TokenUtils.verifyToken(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );
    req.user = payload; // Foydalanuvchi ma'lumotlarini so'rovga qo'shish
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid token" }); // Noto'g'ri token
  }
};

module.exports = authMiddleware;