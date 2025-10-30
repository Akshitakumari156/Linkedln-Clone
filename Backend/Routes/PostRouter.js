import express from "express";
const router = express.Router();
import multer from "multer";
import { upload } from "../Controllers/PostController.js";
import { createPost, getAllPosts, getPostsById, updatePost,deletePost} from "../Controllers/PostController.js";
import { createPostValidation,updatePostValidation } from "../Middlewares/PostValidation.js";
router.post("/create", upload.single("image"), createPostValidation, createPost);
router.get("/", getAllPosts);
router.get("/:id", getPostsById);
router.put("/update/:id", upload.single("image"), updatePostValidation, updatePost);
router.delete("/delete/:id", deletePost);

export default router;
