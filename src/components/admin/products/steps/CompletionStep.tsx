// src/components/admin/products/steps/CompletionStep.tsx
"use client";

import { useBulkUpload } from "../BulkUploadForm";
import { Button } from "@/components/ui/button";
import { CheckCircleIcon, BoxesIcon, TagsIcon, ListPlusIcon, ImagesIcon, ClockIcon, HomeIcon, UploadIcon } from "lucide-react";
import Link from "next/link";

export default function CompletionStep() {
  const { processingResult, setCurrentStep, setSelectedCategoryId, setSelectedFile, setValidationResult, setProcessingResult } = useBulkUpload();
  
  // Reset the whole form to start again
  const handleStartNew = () => {
    // Reset all state
    setSelectedCategoryId(null);
    setSelectedFile(null);
    setValidationResult(null);
    setProcessingResult(null);
    setCurrentStep(1);
  };
  
  // If no processing result
  if (!processingResult) {
    return (
      <div className="text-center py-12">
        <div className="rounded-full bg-zinc-800 p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
          <CheckCircleIcon className="h-8 w-8 text-zinc-400" />
        </div>
        <h3 className="text-xl font-medium mb-2 text-white">No Processing Results</h3>
        <p className="text-zinc-400 mb-6">
          There are no processing results to display. Please restart the upload process.
        </p>
        <Button
          onClick={handleStartNew}
          className="bg-tan text-zinc-950 hover:bg-tan/90"
        >
          <UploadIcon className="mr-2 h-4 w-4" />
          Start New Upload
        </Button>
      </div>
    );
  }
  
  // Format time elapsed
  const formatTime = (timeInMs: number) => {
    const seconds = Math.floor(timeInMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    
    if (minutes > 0) {
      return `${minutes}m ${remainingSeconds}s`;
    } else {
      return `${seconds}s`;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="rounded-full bg-tan/20 p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
          <CheckCircleIcon className="h-10 w-10 text-tan" />
        </div>
        <h3 className="text-2xl font-medium mb-2 text-white">Upload Complete!</h3>
        <p className="text-zinc-400 mb-6">
          Your products have been successfully processed and added to the database.
        </p>
      </div>
      
      {/* Summary stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 bg-zinc-900 rounded-md border border-zinc-800 flex items-center">
          <div className="rounded-full bg-zinc-800 p-3 mr-4">
            <BoxesIcon className="h-6 w-6 text-tan" />
          </div>
          <div>
            <div className="text-sm text-zinc-400">Products Created</div>
            <div className="text-2xl font-semibold text-white">{processingResult.productsCreated}</div>
          </div>
        </div>
        
        <div className="p-5 bg-zinc-900 rounded-md border border-zinc-800 flex items-center">
          <div className="rounded-full bg-zinc-800 p-3 mr-4">
            <TagsIcon className="h-6 w-6 text-tan" />
          </div>
          <div>
            <div className="text-sm text-zinc-400">Variants Created</div>
            <div className="text-2xl font-semibold text-white">{processingResult.variantsCreated}</div>
          </div>
        </div>
        
        <div className="p-5 bg-zinc-900 rounded-md border border-zinc-800 flex items-center">
          <div className="rounded-full bg-zinc-800 p-3 mr-4">
            <ListPlusIcon className="h-6 w-6 text-tan" />
          </div>
          <div>
            <div className="text-sm text-zinc-400">Attributes Created</div>
            <div className="text-2xl font-semibold text-white">{processingResult.attributesCreated}</div>
          </div>
        </div>
        
        <div className="p-5 bg-zinc-900 rounded-md border border-zinc-800 flex items-center">
          <div className="rounded-full bg-zinc-800 p-3 mr-4">
            <ImagesIcon className="h-6 w-6 text-tan" />
          </div>
          <div>
            <div className="text-sm text-zinc-400">Images Uploaded</div>
            <div className="text-2xl font-semibold text-white">{processingResult.imagesUploaded}</div>
          </div>
        </div>
      </div>
      
      <div className="p-5 bg-zinc-900 rounded-md border border-zinc-800 flex items-center justify-center">
        <ClockIcon className="h-5 w-5 text-zinc-400 mr-2" />
        <span className="text-zinc-300">
          Total processing time: <span className="text-tan font-medium">{formatTime(processingResult.timeElapsed)}</span>
        </span>
      </div>
      
      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
        <Button
          asChild
          className="bg-tan text-zinc-950 hover:bg-tan/90"
        >
          <Link href="/obm-admin/manage-products">
            <BoxesIcon className="mr-2 h-4 w-4" />
            View Products
          </Link>
        </Button>
        
        <Button
          onClick={handleStartNew}
          variant="outline"
          className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white"
        >
          <UploadIcon className="mr-2 h-4 w-4" />
          Upload More Products
        </Button>
        
        <Button
          asChild
          variant="outline"
          className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white"
        >
          <Link href="/obm-admin/dashboard">
            <HomeIcon className="mr-2 h-4 w-4" />
            Dashboard
          </Link>
        </Button>
      </div>
    </div>
  );
}