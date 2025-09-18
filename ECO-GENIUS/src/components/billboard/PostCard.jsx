import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Calendar, User } from "lucide-react";

export default function PostCard({ post, detailed = false }) {
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

  return (
    <Card className="rounded-2xl shadow-md hover:shadow-lg transition p-4">
      {/* image */}
      {post.image_url ? (
        <img
          src={
            Array.isArray(post.image_url) ? post.image_url[0] : post.image_url
          }
          alt={post.title}
          className="w-full h-48 object-cover rounded-xl mb-4"
        />
      ) : (
        <div className="w-full h-48 bg-gray-100 flex items-center justify-center rounded-xl mb-4">
          <span className="text-gray-400 text-sm">No Image</span>
        </div>
      )}

      <CardContent>
        {/* title */}
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          {post.title}
        </h2>

        {/* category + nickname */}
        <div className="flex flex-wrap items-center text-sm text-gray-600 mb-3 gap-2">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryClasses(
              post.category
            )}`}
          >
            {post.category}
          </span>
          <span className="flex items-center gap-1 text-gray-600 text-xs">
            <User className="w-3 h-3" />
            {post.nickname}
          </span>
        </div>

        {/* description */}
        {detailed ? (
          <p className="text-gray-700 mb-4">{post.description}</p>
        ) : (
          <p className="text-gray-700 text-sm mb-3 line-clamp-3">
            {post.description}
          </p>
        )}

        {/* location + time */}
        <div className="flex justify-between text-sm text-gray-500 mt-2">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            {`${post.street_name || ""}${
              post.suburb ? ", " + post.suburb : ""
            }${post.postcode ? " " + post.postcode : ""}`}
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {new Date(post.created_at).toLocaleDateString()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
