import React, { useRef, useState } from "react";
import { createPost } from "../../api/billboardApi";
import { Button } from "../../components/ui/button";
import { Camera, Upload, Eye } from "lucide-react";
import CameraCapture from "../../components/scan/CameraCapture";
import { uploadFileToLambda } from "../../api/cloudinaryUploadApi";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { ToastAction } from "../../components/ui/toast";
import { Label } from "../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../components/ui/use-toast";

export default function NewPost() {
  const navigate = useNavigate();
  const { toast } = useToast();

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
      } catch (error) {
        toast({
          title: "❌ Image upload failed",
          description: error?.message || String(error),
          variant: "destructive",
          action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
        });
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
    } catch (error) {
      toast({
        title: "❌ Image upload failed",
        description: error?.message || String(error),
        variant: "destructive",
        action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await createPost(form);

      toast({
        title: "✅ Post Created",
        description: `Redirecting to your post...`,
      });

      setTimeout(() => {
        navigate(`/billboard/posts/${res.id}`);
      }, 2000);
    } catch {
      toast({
        title: "❌ Failed to create post",
        variant: "destructive",
      });
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
        className="space-y-6 bg-white p-6 rounded-xl shadow"
      >
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
          />
        </div>

        <div>
          <Label htmlFor="street_name">Street Name</Label>
          <Input
            id="street_name"
            name="street_name"
            value={form.street_name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="suburb">Suburb</Label>
            <Input
              id="suburb"
              name="suburb"
              value={form.suburb}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="postcode">Postcode</Label>
            <Input
              id="postcode"
              name="postcode"
              value={form.postcode}
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="nickname">Nickname</Label>
          <Input
            id="nickname"
            name="nickname"
            value={form.nickname}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label htmlFor="category">Category</Label>
          <Select
            value={form.category}
            onValueChange={(value) =>
              setForm((prev) => ({ ...prev, category: value }))
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choose a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Appliance">Appliance</SelectItem>
              <SelectItem value="Furniture">Furniture</SelectItem>
              <SelectItem value="Others">Others</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-4">
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
              <img
                src={previewUrl}
                alt="Preview"
                className="block mx-auto h-64 object-contain rounded-lg shadow-md mb-4"
              />

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
          </CardContent>
        </Card>
      )}

      {showCamera && (
        <div className="mt-6 mb-8">
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Camera className="w-5 h-5 text-purple-600" />
                <span>Camera</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CameraCapture
                onCapture={handleCameraCapture}
                onClose={() => setShowCamera(false)}
              />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
