import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getPostDetail,
  createResponse,
  getResponses,
} from "../../api/billboardApi";
import { Loader2 } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";

export default function PostDetail() {
  const { postId } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // reply form states
  const [reply, setReply] = useState("");
  const [replyNickname, setReplyNickname] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getPostDetail(postId);
        setPost(data);

        // get responses
        const respData = await getResponses(postId);
        setResponses(respData);
      } catch (err) {
        console.error("Error fetching post or responses:", err);
        setMessage("❌ Failed to load post or responses");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [postId]);

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    if (!reply.trim() || !replyNickname.trim()) return;

    try {
      const newResp = await createResponse({
        post_id: Number(postId),
        nickname: replyNickname,
        content: reply.trim(),
      });
      setResponses((prev) => [...prev, newResp]);
      setReply("");
      setReplyNickname("");
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
    <div className="max-w-3xl mx-auto py-8 px-4 space-y-6">
      {/* Back button */}
      <Button
        variant="outline"
        onClick={() => navigate(-1)}
        className="text-purple-600 hover:underline mb-4"
      >
        ← Back
      </Button>
      {/* Title */}
      <Card className="shadow-md mb-8">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">{post.title}</CardTitle>
        </CardHeader>

        <CardContent>
          {/* category + nickname tags */}
          <div className="flex gap-3 mb-4">
            <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
              {post.category}
            </span>
            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
              By {post.nickname}
            </span>
          </div>

          {/* Image */}
          {post.image_url && (
            <div className="mb-4 flex justify-center">
              <img
                src={post.image_url}
                alt={post.title}
                className="max-h-96 rounded-lg shadow object-contain"
              />
            </div>
          )}

          {/* description */}
          <p className="text-gray-700 mb-4">{post.description}</p>

          {/* Location and Time */}
          <p className="text-sm text-gray-500">
            Location: {post.street_name}, {post.suburb} {post.postcode} · Posted
            on {new Date(post.created_at).toLocaleDateString()}
          </p>
        </CardContent>
      </Card>

      {/* Response list */}
      <Card className="shadow-md mb-8">
        <CardHeader>
          <CardTitle>Responses</CardTitle>
        </CardHeader>
        <CardContent>
          {responses.length === 0 ? (
            <p className="text-gray-500">No responses yet.</p>
          ) : (
            <ul className="space-y-3">
              {responses.map((r) => (
                <li key={r.id} className="bg-gray-50 p-3 rounded-xl">
                  <p className="text-gray-700">{r.content}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    By {r.nickname} ·{" "}
                    {new Date(r.created_at).toLocaleDateString()}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      {/* Response form */}
      <Card>
        <CardHeader>
          <CardTitle>Leave a Reply</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleReplySubmit} className="space-y-4">
            <div>
              <Label htmlFor="nickname">Your nickname</Label>
              <Input
                id="nickname"
                type="text"
                value={replyNickname}
                onChange={(e) => setReplyNickname(e.target.value)}
                placeholder="Enter your nickname"
                required
              />
            </div>

            <div>
              <Label htmlFor="reply">Your reply</Label>
              <Textarea
                id="reply"
                rows={3}
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                placeholder="Write your reply..."
                required
              />
            </div>

            <button
              type="submit"
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
            >
              Reply
            </button>
          </form>
        </CardContent>
      </Card>
      {message && <p className="mt-4 text-sm">{message}</p>}
    </div>
  );
}
