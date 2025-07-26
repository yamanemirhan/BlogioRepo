"use client";

import { Post } from "@/types/post";
import { formatDateTime } from "@/utils/dateUtils";

interface PostCardProps {
  post: Post;
  isAuthor: boolean;
}

export default function PostCard({ post, isAuthor }: PostCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-5 hover:shadow-xl transition duration-300">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">{post.title}</h2>
      <p className="text-gray-600 mb-3">{post.content}</p>

      <div className="text-sm text-gray-500 flex flex-col gap-1">
        <span>📅 {formatDateTime(post.createdDate)}</span>
        <span>✍️ {post.author.username}</span>
      </div>

      {isAuthor && (
        <p className="mt-3 text-green-600 font-medium">
          ✅ You are the author of this post.
        </p>
      )}
    </div>
  );
}
