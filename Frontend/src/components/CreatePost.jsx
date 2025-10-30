import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const CreatePost = ({ onPostCreated }) => {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth(); // ✅ get logged-in user

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text && !image) return alert("Write something or upload an image!");

    const formData = new FormData();
    console.log("🧠 Current user from context:", user);
    formData.append("userId", user?._id); // ✅ logged-in user's Mongo _id
    formData.append("text", text);
    if (image) formData.append("image", image);
    console.log("🧠 Current user from context:", user);
    console.log("📦 FormData userId:", user?._id);
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/api/posts/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("✅ Post created:", res.data);
      setText("");
      setImage(null);
      onPostCreated(); // refresh feed
    } catch (err) {
      console.error("❌ Error creating post:", err);
      alert("Post failed. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-4 border border-gray-200">
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Start a post..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full border rounded-md p-2 mb-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="mb-3"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          {loading ? "Posting..." : "Post"}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
