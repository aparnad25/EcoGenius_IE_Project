import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tag, MapPin, Calendar } from "lucide-react";

export default function PostCard({ post }) {
  return (
    <Card className="rounded-2xl shadow-md hover:shadow-lg transition p-4">
      {/* image */}
      {post.image_url && (
        <img
          src={Array.isArray(post.image_url) ? post.image_url[0] : post.image_url}
          alt={post.title}
          className="w-full h-48 object-cover rounded-xl mb-4"
        />
      )}

      <CardContent>
        {/* title */}
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          {post.title}
        </h2>

        {/* category + status */}
        <div className="flex flex-wrap items-center text-sm text-gray-600 mb-3 gap-2">
          <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
            {post.category}
          </span>

          {post.status && (
            <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
              {post.status}
            </span>
          )}

          {post.condition && (
            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
              {post.condition}
            </span>
          )}
        </div>

        {/* body */}
        <p className="text-gray-700 text-sm mb-3 line-clamp-3">{post.body}</p>

        {/* location + time */}
        <div className="flex justify-between text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            {post.location || "Unknown Location"}
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {new Date(post.created_at).toLocaleDateString()}
          </div>
        </div>

        {/* tags */}
        {post.tags && (
          <div className="flex flex-wrap gap-2 mt-3">
            {post.tags.map((tag, idx) => (
              <span
                key={idx}
                className="flex items-center gap-1 text-xs px-2 py-1 bg-gray-100 rounded-full"
              >
                <Tag className="w-3 h-3 text-gray-500" />
                {typeof tag === "string" ? tag : tag.tag}
              </span>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
