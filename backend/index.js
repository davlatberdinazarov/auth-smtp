require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");
const logger = require("./logger");

// Routes
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/users.route");

app.use(express.json());
app.use(helmet());
app.use(morgan("combined", {
  stream: {
    write: (message) => logger.info(message.trim()),
  }
}));
app.use(cors());

app.use('/api', authRoutes);
app.use('/api', userRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log("DB Connection Error", err);
  });

let PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
