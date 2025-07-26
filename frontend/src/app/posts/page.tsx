"use client";

import AuthGuard from "@/components/AuthGuard";
import { usePostService } from "@/hooks/usePostService";
import { Post } from "@/types/post";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import PostCard from "@/components/PostCard";

export default function PostsPage() {
  const { getAll } = usePostService();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useUser();

  const fetchPosts = async () => {
    setIsLoading(true);
    const response = await getAll();
    if (response.isSuccess) {
      setPosts(response.data ?? []);
    } else {
      console.error(
        "Post fetching error:",
        response.message || "Unexpected error"
      );
      setPosts([]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <AuthGuard requireAuth={true}>
      <div className="max-w-6xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Posts</h1>
        {isLoading ? (
          <div className="text-center text-lg">Loading...</div>
        ) : posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                isAuthor={post.author.clerkId === user?.id}
              />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500">No posts available.</div>
        )}
      </div>
    </AuthGuard>
  );
}
