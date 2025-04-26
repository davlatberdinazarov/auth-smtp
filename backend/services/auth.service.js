const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const MailService = require("./mail.service"); // MailService classi import
const {
  registerStep1Schema,
  registerStep2Schema,
  loginSchema,
} = require("../validation/auth.validation");
const TokenUtils = require("../utils/tokenUtils");

class AuthService {
  async registerStep1(fullName, email, password) {
    // valideate with joi
    const { error } = registerStep1Schema.validate({
      fullName,
      email,
      password,
    });
    if (error) {
      throw new Error(error.details[0].message);
    }
    // Email borligini tekshiramiz
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("Email already exists");
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
      message: "OTP sent to your email",
    };
  }

  async registerStep2(fullName, email, password, code) {
    // validatsiya
    const { error } = registerStep2Schema.validate({
      fullName,
      email,
      password,
      code,
    });
    if (error) {
      throw new Error(error.details[0].message);
    }

    const isOtpValid = MailService.verifyOtp(email, code);
    if (!isOtpValid) {
      throw new Error("Invalid or expired OTP");
    }

    // Parolni hash qilish
    const hashedPassword = await bcrypt.hash(password, 10);

    // Yangi foydalanuvchi saqlash
    const newUser = new User({
      fullName,
      email,
      password : hashedPassword,
    });

    await newUser.save();

    // token yaratish
    const accessToken = TokenUtils.generateAccessToken({ id: newUser._id });
    const refreshToken = TokenUtils.generateRefreshToken({ id: newUser._id });

    return {
      message: "User successfully registered",
      accessToken,
      refreshToken,
    };
  }

  async login(email, password) {
    // validatsiya
    const { error } = loginSchema.validate({ email, password });
    if (error) {
      throw new Error(error.details[0].message);
    }
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    // Token yaratish
    const accessToken = TokenUtils.generateAccessToken({ id: user._id });
    const refreshToken = TokenUtils.generateRefreshToken({ id: user._id });

    return {
      message: "User successfully logged in",
      accessToken,
      refreshToken,
    };
  }

  // Reset password
  async resetPasswordStep1(email) {
    // validatsiya

    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }

    // Send OTP to email
    await MailService.sendOtp(email);

    return {
      message: "OTP sent to your email",
    };
  }

  async resetPasswordStep2(email, code, newPassword) {
    // validatsiya
    const isOtpValid = MailService.verifyOtp(email, code);
    if (!isOtpValid) {
      throw new Error("Invalid or expired OTP");
    }

    // Parolni hash qilish
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Foydalanuvchini yangilash
    await User.updateOne({ email }, { password: hashedPassword });

    return {
      message: "Password successfully reset",
    };
  }
}

module.exports = new AuthService();
