const AuthService = require('../services/auth.service');

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
    const result = await AuthService.registerStep2(fullName, email, password, code);
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

module.exports = {
    registerStep1,
    registerStep2,
    login
}