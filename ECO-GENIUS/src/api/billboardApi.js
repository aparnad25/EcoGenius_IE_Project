// src/api/billboardApi.js

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// get all posts
export async function getPosts() {
  console.log("API_BASE_URL:", API_BASE_URL);
  const res = await fetch(`${API_BASE_URL}/posts`, {
    method: "GET",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }
  
  return res.json();
}

// create a new post
export async function createPost(payload) {
  // ensure only fields required by the database are sent
  const postData = {
    title: payload.title,
    description: payload.description || null,
    image_url: payload.image_url || null,
    street_name: payload.street_name,
    suburb: payload.suburb || null,
    postcode: payload.postcode || null,
    category: payload.category || "Others",
    nickname: payload.nickname,
  };

  const res = await fetch(`${API_BASE_URL}/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(postData),
  });
  if (!res.ok) {
    throw new Error("Failed to create post");
  }
  return res.json();
}

// get details of a specific post by ID
export async function getPostDetail(postId) {
  const res = await fetch(`${API_BASE_URL}/posts/${postId}`, {
    method: "GET",
  });
  if (!res.ok) {
    throw new Error("Post not found");
  }
  return res.json();
}

// create a new response for a post
export async function createResponse(responseData) {
  
  // ensure only fields in the responses table are sent
  const responsePayload = {
    post_id: responseData.post_id,
    nickname: responseData.nickname,
    content: responseData.content,
  };

  const res = await fetch(`${API_BASE_URL}/responses`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(responsePayload),
  });
  if (!res.ok) {
    throw new Error("Failed to create response");
  }
  return res.json();
}

// get all responses for a specific post by post ID
export async function getResponses(postId) {
  const res = await fetch(`${API_BASE_URL}/posts/${postId}/responses`, {
    method: "GET",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch responses");
  }
  return res.json();
}