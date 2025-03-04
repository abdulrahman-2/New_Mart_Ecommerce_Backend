import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import compression from "compression";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import productRoutes from "./routes/product.route.js";
import authRoutes from "./routes/auth.route.js";
import paymentRoutes from "./routes/payment.route.js";

dotenv.config();

const PORT = process.env.PORT || 8000;

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(compression());

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      process.env.CLIENT_URL1,
      process.env.CLIENT_URL2,
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Connect to MongoDB
connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/payments", paymentRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
