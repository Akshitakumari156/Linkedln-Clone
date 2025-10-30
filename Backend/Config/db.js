import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const mainConnection = mongoose.createConnection(
  process.env.MONGO_URI,
);

mainConnection.on("connected", () => {
  console.log("✅ Auth DB connected");
});

export { mainConnection };