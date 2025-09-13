// src/services/cloudinaryUploadApi.js

const LOCAL_API = "http://localhost:3001/api";  // LOCAL Express/Node server
const DEV_API = "https://c2dtf2y4f8.execute-api.ap-southeast-2.amazonaws.com/dev";

const API_BASE_URL = import.meta.env.MODE === "development" ? LOCAL_API : DEV_API;

export async function uploadFileToLambda(file) {
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  const base64 = await toBase64(file);

  const res = await fetch(`${API_BASE_URL}/upload`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ file: base64 }),
  });

  if (!res.ok) {
    throw new Error("Upload failed: " + res.statusText);
  }

  return res.json(); // { secure_url, public_id, ... }
}
