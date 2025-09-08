import React, { useEffect, useState } from "react";
import { getPosts } from "../../api/communityApi.js";
import PostCard from "../../components/community/PostCard";
import { Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function Community() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true);
        const data = await getPosts();
        setPosts(data);
      } catch (err) {
        setError("Failed to load posts. Please try again later.");
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Community</h1>
        <button
          onClick={() => navigate("/posts/new")}
          className="px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition"
        >
          + Create Post
        </button>
      </div>

      {loading && (
        <div className="flex justify-center items-center py-10">
          <Loader2 className="w-8 h-8 text-purple-600 animate-spin" />
          <span className="ml-2 text-gray-600">Loading posts...</span>
        </div>
      )}

      {error && (
        <div className="text-center text-red-600 bg-red-50 p-4 rounded-xl">
          {error}
        </div>
      )}

      {!loading && posts.length === 0 && (
        <div className="text-center text-gray-600 bg-gray-50 p-6 rounded-xl">
          No posts available. Be the first to create one!
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <Link key={post.id} to={`/posts/${post.id}`}>
            <PostCard post={post} />
          </Link>
        ))}
      </div>
    </div>
  );
}
