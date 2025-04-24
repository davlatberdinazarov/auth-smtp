const nodemailer = require("nodemailer");

class MailService {
  constructor() {
    this.otpStore = {};
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_LOGIN, // Brevo uchun login bu alohida bo‘ladi
        pass: process.env.SMTP_PASS,
      },
    });
  }

  generateOtp() {
    return Math.floor(100000 + Math.random() * 900000);
  }

  async sendOtp(to) {
    const otp = this.generateOtp();
    this.otpStore[to] = {
      otp,
      expireAt: Date.now() + 5 * 60 * 1000, // 5 daqiqa
    };

    const mailOptions = {
      from: `"My App" <${process.env.SMTP_USER}>`, // Display Name va "From" manzili
      to,
      subject: `Your OTP Code`,
      html: `<h2>Your OTP is: <b>${otp}</b></h2><p>It expires in 5 minutes.</p>`,
    };

    const info = await this.transporter.sendMail(mailOptions);
    console.log(`OTP sent to ${to}: ${otp} (${info.messageId})`);
    return otp;
  }

  verifyOtp(to, inputOtp) {
    const data = this.otpStore[to];
    if (!data) return false;
    const isExpired = Date.now() > data.expireAt;
    if (isExpired) return false;
    return data.otp.toString() === inputOtp.toString();
  }
}

module.exports = new MailService();
