import React, { useEffect, useState } from "react";
import axios from "axios";
import CreatePost from "./CreatePost";
import dotenv from "dotenv";
dotenv.config();
const Feed = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const res = await axios.get(`${process.env.Backend_link}/api/posts`);
      setPosts(res.data);
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <CreatePost onPostCreated={fetchPosts} />
      <div className="mt-4">
        {posts.map((post) => (
          <div key={post._id} className="border-t py-3">
            <h4 className="font-semibold">{post.userId?.name || "Anonymous"}</h4>
            <p className="text-gray-700 mb-2">{post.text}</p>
            {post.image && (
              <img
                src={`${process.env.Backend_link}${post.image}`}
                alt="Post"
                className="rounded-lg max-h-96 object-cover"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feed;
