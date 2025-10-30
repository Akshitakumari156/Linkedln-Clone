import axios from "axios";
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import dotenv from "dotenv";
dotenv.config();
export default function Profile() {
  const [posts, setPosts] = useState([]);
  const [editMode, setEditMode] = useState(null);
  const [editText, setEditText] = useState("");
  const [editFile, setEditFile] = useState(null);
  const { user } = useAuth(); // ✅ Logged-in user

  const userId = user?._id;

  // ✅ Fetch all posts for this user
  useEffect(() => {
    if (!userId) {
      console.log("⚠️ userId is missing, user object:", user);
      return;
    }

    axios
      .get(`${process.env.Backend_link}/api/posts/${userId}`)
      .then((res) => {
        console.log("✅ Posts fetched:", res.data);
        setPosts(res.data);
      })
      .catch((err) => {
        console.error("❌ Error fetching posts:", err);
      });
  }, [userId]);

  // ✅ Update post (text + optional image)
  const handleUpdate = async (id) => {
    try {
      const formData = new FormData();
      formData.append("text", editText);
      if (editFile) formData.append("image", editFile);

      const res = await axios.put(
        `${process.env.Backend_link}/api/posts/update/${id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      // ✅ Update post in UI
      setPosts(posts.map((p) => (p._id === id ? res.data.post : p)));
      setEditMode(null);
      setEditText("");
      setEditFile(null);
    } catch (error) {
      console.error("❌ Error updating post:", error);
      alert("Error updating post. Check console for details.");
    }
  };

  // ✅ Delete post
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.Backend_link}/api/posts/delete/${id}`);
      setPosts(posts.filter((p) => p._id !== id));
    } catch (error) {
      console.error("❌ Error deleting post:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Profile Header */}
      <div className="bg-white p-6 shadow-md rounded-xl flex items-center gap-4">
        <img
          src="/defaultProfile.png"
          alt="Profile"
          className="w-20 h-20 rounded-full border"
        />
        <div>
          <h2 className="text-2xl font-semibold">{user?.name || "Your Name"}</h2>
          <p className="text-gray-600">{user?.email || "your@email.com"}</p>
        </div>
      </div>

      {/* User Posts */}
      <div className="mt-6">
        <h3 className="font-semibold text-lg mb-3">Your Posts</h3>
        {posts.length === 0 ? (
          <p className="text-gray-500">You haven’t posted anything yet.</p>
        ) : (
          posts.map((post) => (
            <div
              key={post._id}
              className="bg-white p-4 shadow-sm rounded-lg mb-3"
            >
              {editMode === post._id ? (
                <div>
                  {/* Text Edit */}
                  <textarea
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="w-full border p-2 rounded-md"
                  />

                  {/* Image Edit */}
                  <div className="mt-2">
                    <label className="text-sm text-gray-700">Change Image:</label>
                    <input
                      type="file"
                      onChange={(e) => setEditFile(e.target.files[0])}
                      className="block mt-1 text-sm"
                    />
                    {post.image && (
                      <img
                        src={`http://localhost:5000${post.image}`}
                        alt="Post"
                        className="rounded-lg mt-2 max-h-60"
                      />
                    )}
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => handleUpdate(post._id)}
                      className="bg-green-600 text-white px-3 py-1 rounded-md"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditMode(null)}
                      className="bg-gray-300 px-3 py-1 rounded-md"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <p>{post.text}</p>
                  {post.image && (
                    <img
                      src={`http://localhost:5000${post.image}`}
                      alt="Post"
                      className="rounded-lg mt-2 max-h-60"
                    />
                  )}
                  <div className="flex gap-3 mt-2">
                    <button
                      onClick={() => {
                        setEditMode(post._id);
                        setEditText(post.text);
                        setEditFile(null);
                      }}
                      className="text-blue-500 text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(post._id)}
                      className="text-red-500 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
