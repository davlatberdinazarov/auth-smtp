const AuthService = require("../services/auth.service");
const TokenUtils = require("../utils/tokenUtils");

const registerStep1 = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    const result = await AuthService.registerStep1(fullName, email, password);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const registerStep2 = async (req, res) => {
  const { fullName, email, password, code } = req.body;
  try {
    const result = await AuthService.registerStep2(
      fullName,
      email,
      password,
      code
    );
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await AuthService.login(email, password);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// reset password step 1
const resetPasswordStep1 = async (req, res) => {
  const { email } = req.body;
  try {
    const result = await AuthService.resetPasswordStep1(email);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// reset password step 2
const resetPasswordStep2 = async (req, res) => {
  const { email, code, newPassword } = req.body;
  try {
    const result = await AuthService.resetPasswordStep2(
      email,
      code,
      newPassword
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const refreshAccessToken = async (req, res) => {
  const refreshToken = req.body.refreshToken;

  if (!refreshToken) {
    return res.status(400).json({ message: "Refresh token is required" });
  }

  try {
    // Tokenni tekshiramiz
    const payload = TokenUtils.verifyToken(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    // Yangi access token yaratamiz
    const newAccessToken = TokenUtils.generateAccessToken({
      id: payload.id,
      email: payload.email,
    });

    return res.json({ accessToken: newAccessToken });
  } catch (error) {
    return res.status(401).json({ message: "Invalid refresh token" });
  }
};

module.exports = {
  registerStep1,
  registerStep2,
  login,
  resetPasswordStep1,
  resetPasswordStep2,
  refreshAccessToken
};
