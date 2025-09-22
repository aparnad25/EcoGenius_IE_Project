import React, { useEffect, useState } from "react";
import { getPosts } from "../../api/billboardApi.js";
import PostCard from "../../components/billboard/PostCard.jsx";
import { Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PostFilters from "../../components/billboard/PostFilters.jsx";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Billboard() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    categories: ["Appliance", "Furniture", "Others"],
    locations: [],
  });
  const filteredPosts = posts.filter(
    (post) =>
      filters.categories.includes(post.category) &&
      (filters.locations.length === 0 ||
        filters.locations.includes(post.suburb))
  );

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
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Billboard</h1>
        <p className="text-lg text-gray-600">
          Share and discover reusable kerbside items in your neighbourhood
        </p>
        <div className="flex justify-end mt-4">
          {/* Create Post button */}
          <button
            onClick={() => navigate("/billboard/posts/new")}
            className="px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition"
          >
            + Create Post
          </button>
        </div>

        {/* Filter Section */}
        <div className="flex flex-col items-center gap-2 mt-4">
          <span className="text-sm text-gray-500">Filter by category:</span>
          <PostFilters onChange={setFilters} />
        </div>
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
        {filteredPosts.map((post) => (
          <Link key={post.id} to={`/billboard/posts/${post.id}`}>
            <PostCard post={post} />
          </Link>
        ))}
      </div>
    </div>
  );
}
