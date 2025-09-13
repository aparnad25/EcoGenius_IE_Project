// src/api/communityApi.js

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


export async function getPosts() {
  const res = await fetch(`${API_BASE_URL}/posts`, {
    method: "GET",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }
  return res.json();
}


export async function createPost(payload) {
  const res = await fetch(`${API_BASE_URL}/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw new Error("Failed to create post");
  }
  return res.json();
}


export async function getPostDetail(postId) {
  const res = await fetch(`${API_BASE_URL}/posts/${postId}`, {
    method: "GET",
  });
  if (!res.ok) {
    throw new Error("Post not found");
  }
  return res.json();
}


export async function createResponse(responseData) {
  const res = await fetch(`${API_BASE_URL}/responses`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(responseData),
  });
  if (!res.ok) {
    throw new Error("Failed to create response");
  }
  return res.json();
}