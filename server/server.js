const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRouter = require("./routes/auth/Auth-routes");

mongoose
  .connect(
    "mongodb+srv://sahoosushil456:lgPuiEoeUgO7pXIw@cluster0.mo007z3.mongodb.net/"
  )
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(error));

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://192.168.1.12:5173",//Same Wi-Fi router as PC
      "http://10.122.231.151:5173",//PC's mobile hotspot
    ],
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRouter);

app.listen(PORT, () => console.log(`Server is running now ${PORT}`));
