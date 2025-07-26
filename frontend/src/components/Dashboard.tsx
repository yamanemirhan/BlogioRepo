"use client";

import UserInfo from "./UserInfo";
import { useEffect, useState } from "react";
import { usePostService, CreatePostRequest } from "@/hooks/usePostService";
import toast from "react-hot-toast";

export default function Dashboard() {
  const postService = usePostService();
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const { getAll } = postService;

  const fetchPosts = async () => {
    const response = await getAll();
    if (response.isSuccess) {
      console.log("posts", response.data);
    } else {
      const errorMessage =
        response.errors?.join(", ") || response.message || "Unexpected error";
      console.error("Post fetching error:", errorMessage);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleCreatePost = async () => {
    if (!postTitle.trim() || !postContent.trim()) {
      toast.error("Title and content cannot be empty.");
      return;
    }

    setIsCreatingPost(true);

    try {
      const postData: CreatePostRequest = {
        Title: postTitle.trim(),
        Content: postContent.trim(),
      };

      const response = await postService.create(postData);

      if (response.isSuccess) {
        toast.success(response.message || "Post created successfully!");
        setPostTitle("");
        setPostContent("");
      } else {
        const errorMessage =
          response.errors?.join(", ") || response.message || "Unexpected error";
        toast.error(errorMessage);
      }
    } catch (error: any) {
      const errorMsg =
        error.response?.data?.message ||
        error.response?.data?.errors?.join(", ") ||
        error.message ||
        "API request failed";
      toast.error(errorMsg);
    } finally {
      setIsCreatingPost(false);
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <UserInfo />
      <div className="max-w-4xl mx-auto px-4 mt-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-6">Create New Post</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Post Title
              </label>
              <input
                type="text"
                value={postTitle}
                onChange={(e) => setPostTitle(e.target.value)}
                placeholder="Enter post title..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Post Content
              </label>
              <textarea
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                placeholder="Write your post content here..."
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex">
              <button
                onClick={handleCreatePost}
                disabled={
                  isCreatingPost || !postTitle.trim() || !postContent.trim()
                }
                className={`px-6 py-2 rounded-md font-medium transition-colors ${
                  isCreatingPost || !postTitle.trim() || !postContent.trim()
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                {isCreatingPost ? "Creating..." : "Create Post"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
