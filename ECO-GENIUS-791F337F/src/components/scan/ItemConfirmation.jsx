import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, RotateCcw, Loader2 } from "lucide-react";

export default function ItemConfirmation({ previewUrl, analyzing, onAnalyze, onRetake }) {
  return (
    <Card className="shadow-xl mb-8">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Eye className="w-5 h-5 text-emerald-600" />
          <span>Confirm Your Item</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center">
          <div className="relative inline-block mb-6">
            <img 
              src={previewUrl} 
              alt="Item to recycle" 
              className="max-w-full h-64 object-cover rounded-lg shadow-md"
            />
          </div>
          
          <p className="text-gray-600 mb-6">
            Does this image clearly show the item you want to recycle?
          </p>
          
          <div className="flex justify-center space-x-4">
            <Button 
              variant="outline" 
              onClick={onRetake}
              disabled={analyzing}
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Retake Photo
            </Button>
            <Button 
              onClick={onAnalyze}
              disabled={analyzing}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              {analyzing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                'Get Recycling Advice'
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}