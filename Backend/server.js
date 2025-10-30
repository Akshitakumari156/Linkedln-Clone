import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
import cors from "cors";

const app = express();
import AuthRouter from "./Routes/AuthRouter.js";
import PostRouter from "./Routes/PostRouter.js";
app.use(cors());
app.use(express.json());
app.use('/auth',AuthRouter);
app.use('/uploads', express.static('uploads'));
app.use('/api/posts',PostRouter);
app.get("/", (req, res) => {
  res.send("Hello from MERN backend!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));