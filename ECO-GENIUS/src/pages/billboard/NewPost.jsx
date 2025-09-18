import React, { useRef, useEffect, useState } from "react";
import { createPost } from "../../api/billboardApi";
import { Button } from "../../components/ui/button";
import { Camera, Upload } from "lucide-react";
import CameraCapture from "../../components/scan/CameraCapture";
import { uploadFileToLambda } from "../../api/cloudinaryUploadApi";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Eye } from "lucide-react";

export default function NewPost() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    image_url: "",
    street_name: "",
    suburb: "",
    postcode: "",
    category: "Appliance",
    nickname: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const fileInputRef = useRef(null);

  const handleActionClick = (action) => {
    if (action === "upload") {
      fileInputRef.current?.click();
    } else if (action === "camera") {
      setShowCamera(true);
    }
  };

  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      try {
        const res = await uploadFileToLambda(file);
        setForm((prev) => ({ ...prev, image_url: res.secure_url }));
      } catch (err) {
        setMessage("❌ Image upload failed");
      }
    }
  };

  const handleCameraCapture = async (file) => {
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setShowCamera(false);
    try {
      const res = await uploadFileToLambda(file);
      setForm((prev) => ({ ...prev, image_url: res.secure_url }));
    } catch (err) {
      setMessage("❌ Image upload failed");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await createPost(form);
      setMessage(`✅ Post created! ID: ${res.id}`);
      setForm({
        title: "",
        description: "",
        image_url: "",
        street_name: "",
        suburb: "",
        postcode: "",
        category: "Appliance",
        nickname: "",
      });
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto sm:px-6 lg:px-8 py-8 px-4">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-center">
          Create New Post
        </CardTitle>
      </CardHeader>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded-xl shadow"
      >
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
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          rows="4"
        />

        <input
          type="text"
          name="street_name"
          placeholder="Street Name (required)"
          value={form.street_name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="text"
          name="suburb"
          placeholder="Suburb"
          value={form.suburb}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          name="postcode"
          placeholder="Postcode"
          value={form.postcode}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          name="nickname"
          placeholder="Nickname (required)"
          value={form.nickname}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="Appliance">Appliance</option>
          <option value="Furniture">Furniture</option>
          <option value="Others">Others</option>
        </select>

        <div className="flex gap-4 mt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => handleActionClick("upload")}
          >
            <Upload className="w-5 h-5 mr-2" />
            Browse Files
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => handleActionClick("camera")}
          >
            <Camera className="w-5 h-5 mr-2" />
            Open Camera
          </Button>
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          {loading ? "Creating..." : "Create Post"}
        </Button>
      </form>

      {/* Preview Image */}
      {previewUrl && (
        <Card className="shadow-xl mt-6 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Eye className="w-5 h-5 text-emerald-600" />
              <span>Confirm Your Picture</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="relative inline-block mb-6">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="max-w-full h-64 object-cover rounded-lg shadow-md"
                />
              </div>
              <div className="flex justify-center">
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedFile(null);
                    setPreviewUrl(null);
                    setForm((prev) => ({ ...prev, image_url: "" }));
                  }}
                >
                  Remove Photo
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {showCamera && (
        <CameraCapture
          onCapture={handleCameraCapture}
          onClose={() => setShowCamera(false)}
        />
      )}

      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}
