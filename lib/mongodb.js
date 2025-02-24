import mongoose from "mongoose";

export const connectDB = async () => {
  if (global.mongooseConnection) {
    console.log("⚡ Using existing database connection");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    global.mongooseConnection = true;
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};
