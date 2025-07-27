const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRouter = require("./routes/auth/Auth-routes");
const adminProductRouter = require("./routes/admin/products-router");
const shopProductRouter=require('./routes/shop/products')
const shoppingCardRoutes=require('./routes/shop/cart_routes')

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
    origin: "http://localhost:5173",
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
app.use("/api/admin/products", adminProductRouter);
app.use('/api/shop/products',shopProductRouter);
app.use('/api/shop/cart',shoppingCardRoutes)

app.listen(PORT, () => console.log(`Server is running now ${PORT}`));
