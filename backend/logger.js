const { createLogger, format, transports } = require("winston");

const logger = createLogger({
  level: "info", // Log darajasi (info, error, warn va h.k.)
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), // Vaqtni qo'shish
    format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message}`;
    })
  ),
  transports: [
    new transports.Console(), // Konsolga loglar yozish
    new transports.File({ filename: "logs/server.log" }), // Loglarni faylga yozish
  ],
});

module.exports = logger;