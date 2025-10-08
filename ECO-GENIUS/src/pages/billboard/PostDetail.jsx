import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getPostDetail,
  createResponse,
  getResponses,
} from "../../api/billboardApi";
import { Loader2, MapPin, Calendar, User, ArrowLeft, MessageCircle } from "lucide-react";
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
      setMessage("✅ Reply sent successfully!");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error("Error sending response:", err);
      setMessage("❌ Failed to send reply");
    }
  };

  const getCategoryClasses = (category) => {
    switch (category) {
      case "Furniture":
        return "bg-blue-100 text-blue-700";
      case "Appliance":
        return "bg-yellow-100 text-green-700";
      case "Others":
        return "bg-purple-200 text-gray-700";
      default:
        return "bg-gray-100 text-purple-700";
    }
  };

  const getPlaceholder = (category) => {
    switch (category) {
      case "Furniture":
        return {
          gradient: "from-blue-100 via-blue-50 to-indigo-100",
          icon: "🛋️",
        };
      case "Appliance":
        return {
          gradient: "from-yellow-100 via-green-50 to-emerald-100",
          icon: "⚡",
        };
      case "Others":
        return {
          gradient: "from-purple-100 via-pink-50 to-purple-100",
          icon: "📦",
        };
      default:
        return {
          gradient: "from-gray-100 via-gray-50 to-gray-100",
          icon: "📦",
        };
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-green-50 flex justify-center items-center py-20">
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-green-700 animate-spin mx-auto mb-3" />
          <span className="text-gray-600">Loading post...</span>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-green-50 flex justify-center items-center">
        <div className="text-center text-red-600 bg-red-50 p-6 rounded-xl max-w-md">
          <p className="text-lg font-semibold">Post not found</p>
          <Button
            onClick={() => navigate("/billboard")}
            className="mt-4 bg-slate-600 hover:bg-slate-700 text-white"
          >
            Back to Billboard
          </Button>
        </div>
      </div>
    );
  }

  const displayName = post.nickname || post.author || "Anonymous";

  return (
    <div className="min-h-screen bg-green-50 py-8">
      <div className="max-w-4xl mx-auto px-4 space-y-6">
        {/* Back button */}
        <Button
          variant="outline"
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 hover:bg-white hover:border-slate-400 transition-colors text-slate-600"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>

        {/* Main Post Card */}
        <Card className="shadow-lg overflow-hidden">
          {/* Image Section */}
          {post.image_url ? (
            <div className="w-full bg-gray-50">
              <img
                src={post.image_url}
                alt={post.title}
                className="w-full max-h-96 object-contain"
              />
            </div>
          ) : (
            <div className={`w-full h-64 bg-gradient-to-br ${getPlaceholder(post.category).gradient} flex flex-col items-center justify-center gap-3`}>
              <span className="text-8xl opacity-40">{getPlaceholder(post.category).icon}</span>
            </div>
          )}

          <CardContent className="p-6 space-y-4">
            {/* Category Badge */}
            <div className="flex items-center gap-2">
              <span
                className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getCategoryClasses(
                  post.category
                )}`}
              >
                {post.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold text-gray-900">{post.title}</h1>

            {/* Description */}
            <p className="text-gray-700 leading-relaxed text-base">
              {post.description || "No description provided."}
            </p>

            {/* Metadata */}
            <div className="pt-4 border-t border-gray-200 space-y-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4 text-gray-500" />
                <span>
                  {post.street_name && `${post.street_name}, `}
                  {post.suburb && `${post.suburb} `}
                  {post.postcode || ""}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-500" />
                  <span>{displayName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span>{new Date(post.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Responses Section */}
        <Card className="shadow-lg">
          <CardHeader className="border-b">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-gray-600" />
              <CardTitle className="text-xl">
                Responses ({responses.length})
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            {responses.length === 0 ? (
              <div className="text-center py-8">
                <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No responses yet. Be the first to reply!</p>
              </div>
            ) : (
              <ul className="space-y-4">
                {responses.map((r) => (
                  <li key={r.id} className="bg-green-50 p-4 rounded-xl border border-green-100">
                    <p className="text-gray-800 mb-2 leading-relaxed">{r.content}</p>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {r.nickname || "Anonymous"}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(r.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        {/* Reply Form */}
        <Card className="shadow-lg">
          <CardHeader className="border-b">
            <CardTitle className="text-xl">Leave a Reply</CardTitle>
            <CardDescription>Share your thoughts or ask questions</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleReplySubmit} className="space-y-5">
              <div>
                <Label htmlFor="nickname" className="text-sm font-semibold text-gray-700 mb-2 block">
                  Your alias
                </Label>
                <Input
                  id="nickname"
                  type="text"
                  value={replyNickname}
                  onChange={(e) => setReplyNickname(e.target.value)}
                  placeholder="Enter your alias"
                  className="border-2 focus:border-green-600 focus:ring-green-100"
                />
              </div>

              <div>
                <Label htmlFor="reply" className="text-sm font-semibold text-gray-700 mb-2 block">
                  Your reply
                </Label>
                <Textarea
                  id="reply"
                  rows={4}
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  placeholder="Write your reply..."
                  className="border-2 focus:border-green-600 focus:ring-green-100 resize-none"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 text-base font-semibold shadow-sm hover:shadow-md transition-all"
              >
                Send Reply
              </Button>
            </form>

            {message && (
              <div className={`mt-4 p-3 rounded-lg text-sm text-center ${
                message.includes('✅') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {message}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}