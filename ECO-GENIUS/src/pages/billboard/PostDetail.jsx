import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPostDetail, createResponse } from "../../api/billboardApi";
import { Loader2 } from "lucide-react";

export default function PostDetail() {
  const { postId } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // 回复表单
  const [reply, setReply] = useState("");

  useEffect(() => {
    async function fetchPost() {
      try {
        const data = await getPostDetail(postId);
        setPost(data);
        // 如果 Lambda 返回时带 responses，可以直接 setResponses(data.responses)
      } catch (err) {
        console.error("Error fetching post:", err);
        setMessage("❌ Failed to load post");
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [postId]);

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    if (!reply.trim()) return;

    try {
      const newResp = await createResponse({
        post_id: Number(postId),
        author_id: 1, // TODO: for now its fixed, the change after login 
        message: reply.trim(),
      });
      setResponses((prev) => [...prev, newResp]);
      setReply("");
    } catch (err) {
      console.error("Error sending response:", err);
      setMessage("❌ Failed to send reply");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <Loader2 className="w-8 h-8 text-purple-600 animate-spin" />
        <span className="ml-2 text-gray-600">Loading post...</span>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-center text-red-600 bg-red-50 p-4 rounded-xl">
        Post not found.
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <button
        onClick={() => navigate(-1)}
        className="text-purple-600 hover:underline mb-4"
      >
        ← Back
      </button>

      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>

      <div className="flex flex-wrap gap-2 mb-4 text-sm">
        <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full">
          {post.category}
        </span>
        {post.status && (
          <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full">
            {post.status}
          </span>
        )}
        {post.condition && (
          <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
            {post.condition}
          </span>
        )}
      </div>

      <p className="text-gray-700 mb-4">{post.body}</p>

      {post.image_url && (
        <img
          src={Array.isArray(post.image_url) ? post.image_url[0] : post.image_url}
          alt={post.title}
          className="w-full h-64 object-cover rounded-xl mb-4"
        />
      )}

      <p className="text-sm text-gray-500 mb-8">
        Location: {post.location} · Posted on{" "}
        {new Date(post.created_at).toLocaleDateString()}
      </p>

      {/* responses */}
      <h2 className="text-xl font-semibold mb-4">Responses</h2>
      {responses.length === 0 ? (
        <p className="text-gray-500">No responses yet.</p>
      ) : (
        <ul className="space-y-3 mb-6">
          {responses.map((r) => (
            <li key={r.id} className="bg-gray-50 p-3 rounded-xl">
              <p className="text-gray-700">{r.message}</p>
              <p className="text-xs text-gray-400 mt-1">
                By user {r.author_id} ·{" "}
                {new Date(r.created_at).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      )}

      {/* Responses Form */}
      <form onSubmit={handleReplySubmit} className="space-y-3">
        <textarea
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          placeholder="Write your reply..."
          className="w-full border p-2 rounded"
          rows="3"
        />
        <button
          type="submit"
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          Reply
        </button>
      </form>

      {message && <p className="mt-4 text-sm">{message}</p>}
    </div>
  );
}
