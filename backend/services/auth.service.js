const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const MailService = require('./mail.service'); // MailService classi import

class AuthService {
  async registerStep1(fullName, email, password) {
    // Email borligini tekshiramiz
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('Email already exists');
    }

    // Parolni hash qilish
    const hashedPassword = await bcrypt.hash(password, 10);

    // OTP yuborish
    await MailService.sendOtp(email);

    // Frontendda vaqtincha saqlanishi kerak bo‘lgan ma'lumotlar
    return {
      fullName,
      email,
      password: hashedPassword,
      message: 'OTP sent to your email'
    };
  }

  async registerStep2(fullName, email, password, code) {
    const isOtpValid = MailService.verifyOtp(email, code);
    if (!isOtpValid) {
      throw new Error('Invalid or expired OTP');
    }

    // Yangi foydalanuvchi saqlash
    const newUser = new User({
      fullName,
      email,
      password
    });

    await newUser.save();

    return {
      message: 'User successfully registered',
      user: { fullName, email }
    };
  }

  async login(email, password) {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    return {
      message: 'User successfully logged in',
      user: { fullName: user.fullName, email }
    };
  }
}

module.exports = new AuthService();
