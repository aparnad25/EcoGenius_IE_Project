import React, { useRef, useState } from "react";
import { createPost } from "../../api/billboardApi";
import { Button } from "../../components/ui/button";
import { Camera, Upload, Eye, X } from "lucide-react";
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
import { useNavigate } from "react-router-dom";
import { useToast } from "../../components/ui/use-toast";

export default function NewPost() {
  const [suburbError, setSuburbError] = useState("");
  const [postcodeError, setPostcodeError] = useState("");
  const [streetError, setStreetError] = useState("");
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
  const [descError, setDescError] = useState("");
  const [titleError, setTitleError] = useState("");

  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [photoConfirmed, setPhotoConfirmed] = useState(false);
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
    if (name === "description" && descError && value.length <= 200) {
      setDescError("");
    }
    if (name === "street_name" && streetError && !/\d/.test(value)) {
      setStreetError("");
    }
  };

  const handleStreetBlur = (e) => {
    const value = e.target.value;
    if (!value.trim()) {
      setStreetError("You need to fill Street name.🙂");
    } else if (/\d/.test(value)) {
      setStreetError("Street name cannot contain numbers.");
    } else {
      setStreetError("");
    }
  };

  const handleDescBlur = (e) => {
    const value = e.target.value;
    if (value.length > 200) {
      setDescError("Description cannot exceed 200 characters.");
    } else {
      setDescError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let hasError = false;
    
    // title validation, title can not be empty
    if (!form.title.trim()) {
      setTitleError("You need to fill Title.");
      hasError = true;
    } else {
      setTitleError("");
    }
    
    // street_name validation, required and cannot contain numbers
    if (!form.street_name.trim()) {
      setStreetError("You need to fill Street name.🙂");
      hasError = true;
    } else if (/\d/.test(form.street_name)) {
      setStreetError("Street name cannot contain numbers.");
      hasError = true;
    } else {
      setStreetError("");
    }
    
    // suburb validation, only letters and spaces allowed if provided
    if (form.suburb.trim()) {
      if (!/^[A-Za-z\s]+$/.test(form.suburb)) {
        setSuburbError("Suburb can only contain letters and spaces.");
        hasError = true;
      } else {
        setSuburbError("");
      }
    } else {
      setSuburbError("");
    }
    
    // postcode validation, must be 4 digits if provided
    if (form.postcode.trim()) {
      if (!/^\d{4}$/.test(form.postcode)) {
        setPostcodeError("Postcode must be 4 digits.");
        hasError = true;
      } else {
        setPostcodeError("");
      }
    } else {
      setPostcodeError("");
    }
    
    if (hasError) {
      setLoading(false);
      return;
    }
    
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 py-10 px-4">
      {/* Page Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Create New Post</h1>
        <p className="text-gray-600">Post kerbside items with the community</p>
      </div>

      {/* Form Container */}
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Basic Information Section */}
          <div>
            <h2 className="text-xl font-semibold text-emerald-700 pb-2 mb-6 border-b-2 border-green-100">
              Basic Information
            </h2>
            
            <div className="space-y-6">
              {/* Title */}
              <div>
                <Label htmlFor="title" className="text-sm font-semibold text-gray-700">
                  Title<span className="text-red-600 ml-1">*</span>
                  <span className="block text-xs font-normal text-gray-500 mt-1">
                    Give the item a clear and descriptive title
                  </span>
                </Label>
                <Input
                  id="title"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="e.g., Wooden Coffee Table - Good Condition"
                  maxLength={80}
                  className="mt-2 border-2 focus:border-emerald-600"
                />
                <div className="text-right text-xs text-gray-400 mt-1">
                  {form.title.length}/80
                </div>
                {titleError && (
                  <p className="text-red-500 text-sm mt-1">{titleError}</p>
                )}
              </div>

              {/* Category - Radio Buttons */}
              <div>
                <Label className="text-sm font-semibold text-gray-700">
                  Category<span className="text-red-600 ml-1">*</span>
                </Label>
                <div className="flex gap-4 mt-2">
                  {['Appliance', 'Furniture', 'PLACEHOLDER (Pet things)','Others'].map((cat) => (
                    <label
                      key={cat}
                      className={`flex items-center px-5 py-3 border-2 rounded-lg cursor-pointer transition-all min-w-[140px] ${
                        form.category === cat
                          ? 'border-emerald-600 bg-emerald-50'
                          : 'border-gray-200 hover:border-emerald-600 hover:bg-green-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="category"
                        value={cat}
                        checked={form.category === cat}
                        onChange={(e) =>
                          setForm((prev) => ({ ...prev, category: e.target.value }))
                        }
                        className="w-4 h-4 mr-3 accent-emerald-600"
                      />
                      <span className={`text-sm ${form.category === cat ? 'font-semibold text-emerald-700' : ''}`}>
                        {cat}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <Label htmlFor="description" className="text-sm font-semibold text-gray-700">
                  Description
                  <span className="block text-xs font-normal text-gray-500 mt-1">
                    Describe the item's condition, size, and any relevant details (optional)
                  </span>
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  onBlur={handleDescBlur}
                  rows={5}
                  maxLength={200}
                  placeholder="Describe your item in detail... Include information about:&#10;• Current condition&#10;• Dimensions or size&#10;• Any flaws or issues&#10;• Anything else..."
                  className="mt-2 border-2 focus:border-emerald-600 resize-none"
                />
                <div className="text-right text-xs text-gray-400 mt-1">
                  {form.description.length}/200
                </div>
                {descError && (
                  <p className="text-red-500 text-sm mt-1">{descError}</p>
                )}
              </div>
            </div>
          </div>

          {/* Location Information Section */}
          <div>
            <h2 className="text-xl font-semibold text-emerald-700 pb-2 mb-6 border-b-2 border-green-100">
              Location Information
            </h2>
            
            <div className="space-y-6">
              {/* Street Name */}
              <div>
                <Label htmlFor="street_name" className="text-sm font-semibold text-gray-700">
                  Street Name<span className="text-red-600 ml-1">*</span>
                  <span className="block text-xs font-normal text-gray-500 mt-1">
                    Please do not include street numbers for privacy 😊
                  </span>
                </Label>
                <Input
                  id="street_name"
                  name="street_name"
                  value={form.street_name}
                  onChange={handleChange}
                  onBlur={handleStreetBlur}
                  placeholder="e.g., Collins Street"
                  className="mt-2 border-2 focus:border-emerald-600"
                />
                {streetError && (
                  <p className="text-red-500 text-sm mt-1">{streetError}</p>
                )}
              </div>

              {/* Suburb and Postcode - Two Columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <Label htmlFor="suburb" className="text-sm font-semibold text-gray-700">
                    Suburb
                    <span className="block text-xs font-normal text-gray-500 mt-1">Optional</span>
                  </Label>
                  <Input
                    id="suburb"
                    name="suburb"
                    value={form.suburb}
                    onChange={handleChange}
                    placeholder="e.g., Melbourne"
                    className="mt-2 border-2 focus:border-emerald-600"
                  />
                  {suburbError && (
                    <p className="text-red-500 text-sm mt-1">{suburbError}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="postcode" className="text-sm font-semibold text-gray-700">
                    Postcode
                    <span className="block text-xs font-normal text-gray-500 mt-1">Optional</span>
                  </Label>
                  <Input
                    id="postcode"
                    name="postcode"
                    value={form.postcode}
                    onChange={handleChange}
                    placeholder="e.g., 3000"
                    maxLength={4}
                    className="mt-2 border-2 focus:border-emerald-600"
                  />
                  {postcodeError && (
                    <p className="text-red-500 text-sm mt-1">{postcodeError}</p>
                  )}
                </div>
              </div>

              {/* Alias */}
              <div>
                <Label htmlFor="nickname" className="text-sm font-semibold text-gray-700">
                  Display Name (Alias)
                  <span className="block text-xs font-normal text-gray-500 mt-1">
                    This name will be shown on your post (optional)
                  </span>
                </Label>
                <Input
                  id="nickname"
                  name="nickname"
                  value={form.nickname}
                  onChange={handleChange}
                  placeholder="e.g., Sarah M."
                  className="mt-2 border-2 focus:border-emerald-600"
                />
              </div>
            </div>
          </div>

          {/* Photos Section */}
          <div>
            <h2 className="text-xl font-semibold text-emerald-700 pb-2 mb-6 border-b-2 border-green-100">
              Photos
            </h2>
            
            {/* Confirmed Photo Thumbnail */}
            {photoConfirmed && previewUrl && (
              <div className="mb-6 flex justify-center">
                <div className="relative group">
                  <img
                    src={previewUrl}
                    alt="Uploaded"
                    className="w-64 h-64 object-cover rounded-lg border-2 border-emerald-500 shadow-md"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedFile(null);
                      setPreviewUrl(null);
                      setPhotoConfirmed(false);
                      setForm((prev) => ({ ...prev, image_url: "" }));
                    }}
                    className="absolute -top-2 -right-2 w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <div className="absolute bottom-0 left-0 right-0 bg-emerald-600 text-white text-xs py-1 px-2 rounded-b-lg flex items-center justify-center gap-1">
                    <span className="text-lg">✓</span>
                    <span>Confirmed</span>
                  </div>
                </div>
              </div>
            )}

            {/* Upload Cards - Only show if no confirmed photo */}
            {!photoConfirmed && !previewUrl && !showCamera && (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                  {/* Upload Photo Card */}
                  <div
                    onClick={() => handleActionClick("upload")}
                    className="border-2 border-dashed border-gray-300 rounded-xl p-10 text-center cursor-pointer transition-all hover:border-emerald-600 hover:bg-green-50 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="text-gray-400 mb-5 flex justify-center">
                      <Upload className="w-14 h-14" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Upload Photo</h3>
                    <p className="text-sm text-gray-500 mb-5">Choose from your device</p>
                    <div className="inline-block px-6 py-2 border-2 border-gray-300 rounded-lg text-sm font-semibold text-gray-700 transition-colors hover:border-emerald-600 hover:text-emerald-700">
                      Browse Files
                    </div>
                  </div>

                  {/* Use Camera Card */}
                  <div
                    onClick={() => handleActionClick("camera")}
                    className="border-2 border-dashed border-gray-300 rounded-xl p-10 text-center cursor-pointer transition-all hover:border-emerald-600 hover:bg-green-50 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="text-gray-400 mb-5 flex justify-center">
                      <Camera className="w-14 h-14" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Use Camera</h3>
                    <p className="text-sm text-gray-500 mb-5">Take photo now</p>
                    <div className="inline-block px-6 py-2 border-2 border-gray-300 rounded-lg text-sm font-semibold text-gray-700 transition-colors hover:border-emerald-600 hover:text-emerald-700">
                      Open Camera
                    </div>
                  </div>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />

                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded text-sm text-yellow-800">
                  📸 Currently supports 1 photo upload. Multiple photo upload will be available in the future!
                </div>
              </div>
            )}

            {/* Preview Image - Modal style for confirmation */}
            {previewUrl && !photoConfirmed && (
              <Card className="shadow-xl">
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
                      className="block mx-auto max-h-96 object-contain rounded-lg shadow-md mb-6"
                    />
                    <div className="flex justify-center gap-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setSelectedFile(null);
                          setPreviewUrl(null);
                          setForm((prev) => ({ ...prev, image_url: "" }));
                        }}
                        className="border-2 hover:border-red-500 hover:text-red-500 px-6"
                      >
                        <X className="w-4 h-4 mr-2" />
                        Remove Photo
                      </Button>
                      <Button
                        type="button"
                        onClick={() => {
                          setPhotoConfirmed(true);
                          toast({
                            title: "✅ Photo confirmed",
                            description: "Your photo has been added to the post",
                          });
                        }}
                        className="bg-emerald-600 text-white hover:bg-emerald-700 px-6"
                      >
                        Confirm Photo
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Camera Capture */}
            {showCamera && !photoConfirmed && (
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
            )}
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(-1)}
              className="px-8 py-3 border-2"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 hover:-translate-y-0.5 hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none min-w-[180px]"
            >
              {loading ? "Creating..." : "Create Post"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}