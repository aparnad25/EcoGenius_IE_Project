import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, Upload, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { analyzeImage, uploadFile } from "../services/aiService";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import CameraCapture from "../components/scan/CameraCapture";
import RecyclingAdvice from "../components/scan/RecyclingAdvice";
import ItemConfirmation from "../components/scan/ItemConfirmation";

export default function ScanItem() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [pendingAction, setPendingAction] = useState(null); // 'upload' or 'camera'
  const fileInputRef = useRef(null);

  const handleActionClick = (action) => {
    setPendingAction(action);
    setShowDisclaimer(true);
  };

  const handleAcceptDisclaimer = () => {
    setShowDisclaimer(false); // Close disclaimer
    if (pendingAction === 'upload') {
      fileInputRef.current?.click();
    } else if (pendingAction === 'camera') {
      setShowCamera(true);
    }
    setPendingAction(null); // Reset pending action
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResult(null);
      setError(null);
    }
  };

  const handleCameraCapture = (file) => {
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setResult(null);
    setError(null);
    setShowCamera(false);
  };

  const handleAnalyzeImage = async () => {
    if (!selectedFile) return;

    setAnalyzing(true);
    setError(null);

    try {
      // Upload the image first
      const { file_url } = await uploadFile(selectedFile);

      // Analyze with AI
      const response = await analyzeImage({
        prompt: `Analyze the image to identify the main item and provide disposal advice for Melbourne, Australia.

Please identify and return your response as a JSON object with the following fields:
1. **item_name**: The specific name (e.g., "plastic water bottle," "glass jar," "old leather jacket").
2. **category**: The material category (plastic, glass, paper, cardboard, metal, organic, landfill, e-waste, clothing).
3. **bin_type**: The CORRECT primary disposal method:
   - "yellow_recycling" for clean plastics, glass, metals, paper, cardboard
   - "green_organics" for food scraps and garden waste  
   - "red_landfill" ONLY for true waste that cannot be recycled
   - "special_collection" for e-waste, clothing, batteries, etc.
4. **alternative_bin_type**: Only provide this if there's a secondary option. For most items, this should be null or the same as bin_type.
5. **explanation**: Clear explanation of why it goes in that bin and any alternatives.
6. **recycling_tip**: Specific actionable tip for this item type.
7. **confidence_score**: 0-100 confidence score.
8. **co2_saved**: CO2 savings in grams if disposed properly vs. worst option.

IMPORTANT: Don't default everything to red_landfill. Most common household items have proper recycling options. Please respond with a valid JSON object.`,
        file_urls: [file_url],
        response_json_schema: {
          type: "object",
          properties: {
            item_name: { type: "string" },
            category: { 
              type: "string", 
              enum: ["plastic", "glass", "paper", "cardboard", "metal", "organic", "landfill", "e-waste", "clothing"] 
            },
            bin_type: { 
              type: "string", 
              enum: ["yellow_recycling", "green_organics", "red_landfill", "special_collection"] 
            },
            alternative_bin_type: { 
              type: "string", 
              enum: ["yellow_recycling", "green_organics", "red_landfill", "special_collection", "none"] 
            },
            confidence_score: { type: "number" },
            co2_saved: { type: "number" },
            recycling_tip: { type: "string" },
            explanation: { type: "string" }
          },
          required: ["item_name", "category", "bin_type", "confidence_score", "co2_saved", "recycling_tip", "explanation"]
        }
      });

      setResult({ ...response, image_url: file_url });
    } catch (err) {
      setError("Failed to analyze image. Please try again.");
      console.error(err);
    }

    setAnalyzing(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">EcoGenius AI Lens</h1>
        <p className="text-lg text-gray-600">
          Take a photo or upload an image to get instant recycling advice
        </p>
      </div>

      <AlertDialog open={showDisclaimer} onOpenChange={setShowDisclaimer}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Help us help you 🌱</AlertDialogTitle>
            <AlertDialogDescription>
              Upload clear photos of your unwanted item only. Please avoid including people, faces, or private information in the image. EcoGenius will suggest the best disposal options, but final responsibility for the item remains with you.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => { setShowDisclaimer(false); setPendingAction(null); }}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleAcceptDisclaimer}>Accept</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {!showCamera && (
        <Card className="shadow-xl mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Camera className="w-5 h-5 text-emerald-600" />
              <span>Choose How to Capture</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Upload Option */}
              <div 
                className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-emerald-400 hover:bg-emerald-50 transition-all duration-200"
                onClick={() => handleActionClick('upload')}
              >
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Upload Photo</h3>
                <p className="text-gray-500 mb-4">Choose from your device</p>
                <Button variant="outline">Browse Files</Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>

              {/* Camera Option */}
              <div 
                className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-emerald-400 hover:bg-emerald-50 transition-all duration-200"
                onClick={() => handleActionClick('camera')}
              >
                <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Use Camera</h3>
                <p className="text-gray-500 mb-4">Take photo now</p>
                <Button variant="outline">Open Camera</Button>
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

      {previewUrl && !result && (
        <ItemConfirmation 
          previewUrl={previewUrl}
          analyzing={analyzing}
          onAnalyze={handleAnalyzeImage}
          onRetake={() => {
            setSelectedFile(null);
            setPreviewUrl(null);
          }}
        />
      )}

      {result && (
        <RecyclingAdvice 
          result={result}
          previewUrl={previewUrl}
          onScanAnother={() => {
            setSelectedFile(null);
            setPreviewUrl(null);
            setResult(null);
          }}
        />
      )}

      {error && (
        <Card className="shadow-lg border-red-200">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 text-red-600">
              <AlertCircle className="w-6 h-6" />
              <p className="font-medium">{error}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}