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

  // Get placeholder design based on category
  const getPlaceholder = (category) => {
    switch (category) {
      case "Furniture":
        return {
          gradient: "from-blue-100 via-blue-50 to-indigo-100",
          icon: "🛋️",
          text: "Furniture"
        };
      case "Appliance":
        return {
          gradient: "from-yellow-100 via-green-50 to-emerald-100",
          icon: "⚡",
          text: "Appliance"
        };
      case "Others":
        return {
          gradient: "from-purple-100 via-pink-50 to-purple-100",
          icon: "📦",
          text: "Others"
        };
      default:
        return {
          gradient: "from-gray-100 via-gray-50 to-gray-100",
          icon: "📦",
          text: "Item"
        };
    }
  };

  // Format author name - show "Anonymous" if no nickname
  const displayName = post.nickname || post.author || "Anonymous";

  // Format location string
  const formatLocation = () => {
    const parts = [];
    if (post.street_name) parts.push(post.street_name);
    if (post.suburb) parts.push(post.suburb);
    if (post.postcode) parts.push(post.postcode);
    return parts.length > 0 ? parts.join(", ") : "Location not specified";
  };

  return (
    <Card className="rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden h-full flex flex-col">
      {/* Image Section */}
      {post.image_url ? (
        <img
          src={
            Array.isArray(post.image_url) ? post.image_url[0] : post.image_url
          }
          alt={post.title}
          className="w-full h-48 object-cover"
        />
      ) : (
        <div className={`w-full h-48 bg-gradient-to-br ${getPlaceholder(post.category).gradient} flex flex-col items-center justify-center gap-2`}>
          <span className="text-6xl opacity-40">{getPlaceholder(post.category).icon}</span>
          <span className="text-gray-400 text-xs font-medium">{getPlaceholder(post.category).text}</span>
        </div>
      )}

      <CardContent className="p-5 flex-1 flex flex-col">
        {/* Category Badge */}
        <div className="mb-3">
          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getCategoryClasses(
              post.category
            )}`}
          >
            {post.category}
          </span>
        </div>

        {/* Title */}
        <h2 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
          {post.title}
        </h2>

        {/* Description */}
        {detailed ? (
          <p className="text-gray-700 text-sm mb-4 leading-relaxed">
            {post.description}
          </p>
        ) : (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
            {post.description || " "}
          </p>
        )}

        {/* Spacer to push footer to bottom */}
        <div className="flex-1"></div>

        {/* Footer - Location, Author, Date */}
        <div className="pt-4 border-t border-gray-100 space-y-2">
          {/* Location */}
          <div className="flex items-start gap-2 text-xs text-gray-500">
            <MapPin className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
            <span className="line-clamp-1">{formatLocation()}</span>
          </div>

          {/* Author and Date */}
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="truncate max-w-[120px]">{displayName}</span>
            </div>
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <Calendar className="w-3.5 h-3.5" />
              <span>{new Date(post.created_at).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}