import React, { useState } from "react";
import { createPost } from "../../api/communityApi";

export default function NewPost() {
  const [form, setForm] = useState({
    author_id: 1, // TODO: 暂时写死，后面接入登录功能再改
    title: "",
    body: "",
    category: "Giveaway",
    status: "",
    condition: "",
    location: "",
    tags: "",
    image_url: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    

    try {
      // 把 tags 处理成 JSONB 格式
      const payload = {
        ...form,
        tags: form.tags ? [{ tag: form.tags }] : [],
      };

      console.log("payload to send:", payload);

      const res = await createPost(payload);
      setMessage(`✅ Post created! ID: ${res.id}`);
      setForm({
        author_id: 1,
        title: "",
        body: "",
        category: "Giveaway",
        status: "",
        condition: "",
        location: "",
        tags: "",
        image_url: "",
      });
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Create New Post</h1>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <textarea
          name="body"
          placeholder="Description"
          value={form.body}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          rows="4"
          required
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="text"
          name="tags"
          placeholder="Tags (single word for now)"
          value={form.tags}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          name="image_url"
          placeholder="Image URL"
          value={form.image_url}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="Giveaway">Giveaway</option>
          <option value="Cost Sharing">Cost Sharing</option>
          <option value="Others">Others</option>
        </select>

        {form.category === "Giveaway" && (
          <select
            name="condition"
            value={form.condition}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Select condition</option>
            <option value="Brand New">Brand New</option>
            <option value="Nearly New">Nearly New</option>
            <option value="Minor Scratch">Minor Scratch</option>
            <option value="Visible Damage">Visible Damage</option>
          </select>
        )}

        {form.category === "Cost Sharing" && (
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Select status</option>
            <option value="Open">Open</option>
            <option value="Solved">Solved</option>
          </select>
        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          {loading ? "Creating..." : "Create Post"}
        </button>
      </form>

      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}
