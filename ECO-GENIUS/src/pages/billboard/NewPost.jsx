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
import AliasGenerator from "../../components/common/AliasGenerator";

export default function NewPost() {
  const [suburbError, setSuburbError] = useState("");
  const [postcodeError, setPostcodeError] = useState("");
  const [streetError, setStreetError] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  // refs for scrolling/focusing invalid fields
  const titleRef = useRef(null);
  const streetRef = useRef(null);
  const suburbRef = useRef(null);
  const postcodeRef = useRef(null);
  const descriptionRef = useRef(null);

  // Add timestamp tracking for preventing duplicate submissions
  const lastSubmitTimeRef = useRef(0);
  const SUBMIT_COOLDOWN = 5000; // 5 seconds

  const scrollAndFocus = (nodeOrRef) => {
    try {
      const node =
        nodeOrRef && nodeOrRef.current ? nodeOrRef.current : nodeOrRef;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const absoluteY = rect.top + window.pageYOffset;
      const target = Math.max(
        0,
        absoluteY - window.innerHeight / 2 + rect.height / 2
      );
      window.scrollTo({ top: target, behavior: "smooth" });
      // focus after a small delay to allow scroll to start
      setTimeout(() => {
        try {
          node.focus({ preventScroll: true });
        } catch {
          try {
            node.focus();
          } catch {
            /* ignore focus failure */
          }
        }
      }, 120);
    } catch {
      /* ignore overall scroll/focus errors */
    }
  };

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
  const [, setSelectedFile] = useState(null);
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
    if (name === "suburb" && suburbError) {
      // clear suburb error when user types a valid suburb (letters and spaces) or when not empty
      if (value.trim() && /^[A-Za-z\s]+$/.test(value)) {
        setSuburbError("");
      }
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

    // Check if within cooldown period
    const now = Date.now();
    const timeSinceLastSubmit = now - lastSubmitTimeRef.current;

    if (timeSinceLastSubmit < SUBMIT_COOLDOWN) {
      const remainingSeconds = Math.ceil(
        (SUBMIT_COOLDOWN - timeSinceLastSubmit) / 1000
      );
      toast({
        title: "⏳ Please wait",
        description: `Please wait ${remainingSeconds} second${
          remainingSeconds > 1 ? "s" : ""
        } before submitting again.`,
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    let hasError = false;
    const errors = {};

    // title validation, title can not be empty
    if (!form.title.trim()) {
      setTitleError("You need to fill Title.");
      hasError = true;
      errors.title = true;
    } else {
      setTitleError("");
    }

    // street_name validation, required and cannot contain numbers
    if (!form.street_name.trim()) {
      setStreetError("You need to fill Street name.🙂");
      hasError = true;
      errors.street_name = true;
    } else if (/\d/.test(form.street_name)) {
      setStreetError("Street name cannot contain numbers.");
      hasError = true;
      errors.street_name = true;
    } else {
      setStreetError("");
    }

    // suburb validation: required, only letters and spaces allowed
    if (!form.suburb.trim()) {
      setSuburbError("You need to fill Suburb.");
      hasError = true;
      errors.suburb = true;
    } else if (!/^[A-Za-z\s]+$/.test(form.suburb)) {
      setSuburbError("Suburb can only contain letters.");
      hasError = true;
      errors.suburb = true;
    } else {
      setSuburbError("");
    }

    // postcode validation, must be 4 digits if provided
    if (form.postcode.trim()) {
      if (!/^\d{4}$/.test(form.postcode)) {
        setPostcodeError("Postcode must be 4 digits.");
        hasError = true;
        errors.postcode = true;
      } else {
        setPostcodeError("");
      }
    } else {
      setPostcodeError("");
    }

    if (hasError) {
      // focus/scroll first invalid field (center of screen)
      const order = [
        "title",
        "street_name",
        "suburb",
        "postcode",
        "description",
      ];
      const firstKey = order.find((k) => errors[k]);
      const refMap = {
        title: titleRef,
        street_name: streetRef,
        suburb: suburbRef,
        postcode: postcodeRef,
        description: descriptionRef,
      };
      const targetRef = refMap[firstKey];
      if (targetRef && targetRef.current) {
        scrollAndFocus(targetRef);
      } else {
        const el = document.querySelector(`[name="${firstKey}"]`);
        if (el) {
          scrollAndFocus(el);
        }
      }
      setLoading(false);
      return;
    }

    try {
      // Update last submit timestamp before API call
      lastSubmitTimeRef.current = now;

      const res = await createPost(form);
      toast({
        title: "✅ Post Created",
        description: `Redirecting to your post...`,
      });
      setTimeout(() => {
        navigate(`/billboard/posts/${res.id}`);
      }, 2000);
    } catch (error) {
      // Reset timestamp on failure so user can retry
      lastSubmitTimeRef.current = 0;
      toast({
        title: "❌ Failed to create post",
        description: error?.message || "Please try again",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  const [alias, setAlias] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 py-10 px-4">
      {/* Page Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Create New Post
        </h1>
        <p className="text-gray-600">
          Post kerbside items within the neighborhood
        </p>
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
                <Label
                  htmlFor="title"
                  className="text-sm font-semibold text-gray-700"
                >
                  Title<span className="text-red-600 ml-1">*</span>
                  <span className="block text-xs font-normal text-gray-500 mt-1">
                    Give the item a clear and descriptive title
                  </span>
                </Label>
                <Input
                  id="title"
                  ref={titleRef}
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
                  {[
                    "Appliance",
                    "Furniture",
                    "PLACEHOLDER (Pet things)",
                    "Others",
                  ].map((cat) => (
                    <label
                      key={cat}
                      className={`flex items-center px-5 py-3 border-2 rounded-lg cursor-pointer transition-all min-w-[140px] ${
                        form.category === cat
                          ? "border-emerald-600 bg-emerald-50"
                          : "border-gray-200 hover:border-emerald-600 hover:bg-green-50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="category"
                        value={cat}
                        checked={form.category === cat}
                        onChange={(e) =>
                          setForm((prev) => ({
                            ...prev,
                            category: e.target.value,
                          }))
                        }
                        className="w-4 h-4 mr-3 accent-emerald-600"
                      />
                      <span
                        className={`text-sm ${
                          form.category === cat
                            ? "font-semibold text-emerald-700"
                            : ""
                        }`}
                      >
                        {cat}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <Label
                  htmlFor="description"
                  className="text-sm font-semibold text-gray-700"
                >
                  Description
                  <span className="block text-xs font-normal text-gray-500 mt-1">
                    Describe the item&apos;s condition, size, and any relevant
                    details (optional)
                  </span>
                </Label>
                <Textarea
                  ref={descriptionRef}
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
                <Label
                  htmlFor="street_name"
                  className="text-sm font-semibold text-gray-700"
                >
                  Street Name<span className="text-red-600 ml-1">*</span>
                  <span className="block text-xs font-normal text-gray-500 mt-1">
                    Please do not include street numbers for privacy 😊
                  </span>
                </Label>
                <Input
                  id="street_name"
                  ref={streetRef}
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
                  <Label
                    htmlFor="suburb"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Suburb
                    <span className="text-red-600 ml-1">*</span>
                  </Label>
                  <Input
                    id="suburb"
                    ref={suburbRef}
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
                  <Label
                    htmlFor="postcode"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Postcode
                    <span className="text-xs font-normal text-gray-500 ml-2">
                      (optional)
                    </span>
                  </Label>
                  <Input
                    id="postcode"
                    ref={postcodeRef}
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
                <Label
                  htmlFor="nickname"
                  className="text-sm font-semibold text-gray-700"
                >
                  Display Your Alias
                  <span className="block text-xs font-normal text-gray-500 mt-1">
                    This name will be shown on your post (optional)
                  </span>
                </Label>
                <div className="flex gap-3 items-start mt-2">
                  <Input
                    id="nickname"
                    name="nickname"
                    value={form.nickname}
                    onChange={handleChange}
                    placeholder="e.g., Sarah"
                    className="flex-1 border-2 focus:border-emerald-600"
                  />
                  <AliasGenerator
                    onGenerate={(alias) =>
                      setForm((prev) => ({ ...prev, nickname: alias }))
                    }
                  />
                </div>
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
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      Upload Photo
                    </h3>
                    <p className="text-sm text-gray-500 mb-5">
                      Choose from your device
                    </p>
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
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      Use Camera
                    </h3>
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
                  📸 Currently supports 1 photo upload. Multiple photo upload
                  will be available in the future!
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
                            description:
                              "Your photo has been added to the post",
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
              className="bg-teal-600 text-white px-8 py-3 rounded-lg hover:bg-teal-700 hover:-translate-y-0.5 hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none min-w-[180px]"
            >
              {loading ? "Creating..." : "Create Post"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
