import models from "../Models/db.js";
const { UserModel, PostModel } = models;
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    },
})
  const FileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'), false);
    }
  }
export const upload = multer({ storage: storage, fileFilter: FileFilter });

export const createPost = async (req, res) => {
  try {
    const { userId, text } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const user = await UserModel.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const newPost = new PostModel({ userId, text, image });
    await newPost.save();

    res.status(201).json({
      message: "Post created successfully",
      post: newPost,
    });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Server error while creating post" });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await PostModel.find()
      .populate("userId", "name email") // show name/email with each post
      .sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
};

export const getPostsById = async (req, res) => {
  try {
    const { id } = req.params; // this is the userId
    console.log("Requested user id:", id);
    const posts = await PostModel.find({ userId: id }).sort({ createdAt: -1 });
    console.log("Fetched posts:", posts);
    if (!posts || posts.length === 0) {
      return res.status(404).json({ error: "No posts found for this user" });
    }
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching user posts:", error);
    res.status(500).json({ error: "Failed to fetch user posts" });
  }
};
export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = {};

    console.log("Incoming update request for:", id);
    console.log("Text:", req.body.text);
    console.log("File:", req.file);

    if (req.body.text) updateData.text = req.body.text;
    if (req.file) updateData.image = `/uploads/${req.file.filename}`;

    const updated = await PostModel.findByIdAndUpdate(id, updateData, { new: true });
    if (!updated) return res.status(404).json({ error: "Post not found" });

    res.status(200).json({
      message: "Post updated successfully",
      post: updated,
    });
  } catch (error) {
    console.error("Error in updatePost:", error);
    res.status(500).json({ error: "Error updating post" });
  }
};


export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await PostModel.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: "Post not found" });

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting post" });
  }
};