// src/components/admin/products/steps/FileUploadStep.tsx
"use client";

import { useState, useRef } from "react";
import { useBulkUpload } from "../BulkUploadForm";
import { Button } from "@/components/ui/button";
import FileDropzone from "../ui/FileDropzone";
import { DownloadIcon, AlertCircleIcon, FileIcon, UploadIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function FileUploadStep() {
  const { 
    selectedCategoryId, 
    selectedFile, 
    setSelectedFile, 
    setValidationResult, 
    nextStep 
  } = useBulkUpload();
  
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [templateError, setTemplateError] = useState<string | null>(null);
  
  // Handle file drop
  const handleFileDrop = (file: File) => {
    // Clear previous states
    setUploadError(null);
    setValidationResult(null);
    
    // Check file type
    const allowedTypes = [
      'text/csv', 
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ];
    
    if (!allowedTypes.includes(file.type)) {
      setUploadError('Invalid file type. Please upload a CSV or Excel file.');
      return;
    }
    
    // Check file size (10MB max)
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes
    if (file.size > maxSize) {
      setUploadError('File size too large. Maximum allowed size is 10MB.');
      return;
    }
    
    // Set the selected file
    setSelectedFile(file);
  };
  
  // Download template function
  const handleDownloadTemplate = async () => {
    try {
      setTemplateError(null);
      
      if (!selectedCategoryId) {
        setTemplateError('No category selected. Please go back and select a category.');
        return;
      }
      
      const response = await fetch(`/api/admin/products/template?categoryId=${selectedCategoryId}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to download template');
      }
      
      // Get filename from Content-Disposition header or use default
      const contentDisposition = response.headers.get('Content-Disposition');
      let filename = 'product_upload_template.xlsx';
      
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="(.+)"/);
        if (filenameMatch) {
          filename = filenameMatch[1];
        }
      }
      
      // Create download link
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error('Error downloading template:', error);
      setTemplateError(error instanceof Error ? error.message : 'Failed to download template');
    }
  };
  
  // Upload and validate file
  const handleValidateFile = async () => {
    if (!selectedFile || !selectedCategoryId) return;
    
    try {
      setIsUploading(true);
      setUploadError(null);
      
      // Create form data
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('categoryId', selectedCategoryId.toString());
      
      // Send request
      const response = await fetch('/api/admin/products/validate', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'File validation failed');
      }
      
      const data = await response.json();
      
      // Store validation results in context
      setValidationResult(data.data);
      
      // Move to next step
      nextStep();
      
    } catch (error) {
      console.error('Error validating file:', error);
      setUploadError(error instanceof Error ? error.message : 'File validation failed');
    } finally {
      setIsUploading(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium text-tan">Upload Product Data</h3>
        <p className="text-sm text-zinc-400">
          Upload a CSV or Excel file containing product information. Download a template to ensure the correct format.
        </p>
      </div>
      
      {/* Download template button */}
      <div className="flex flex-col space-y-2">
        <Button
          variant="outline"
          onClick={handleDownloadTemplate}
          className="w-fit border-tan text-tan hover:bg-tan/10"
        >
          <DownloadIcon className="mr-2 h-4 w-4" />
          Download Template
        </Button>
        
        {templateError && (
          <Alert variant="destructive" className="bg-red-900/30 text-white border-red-800">
            <AlertCircleIcon className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{templateError}</AlertDescription>
          </Alert>
        )}
        
        <p className="text-xs text-zinc-500 mt-1">
          Download the template specific to the selected category to ensure all required fields are included.
        </p>
      </div>
      
      {/* File dropzone */}
      <FileDropzone 
        onFileDrop={handleFileDrop}
        selectedFile={selectedFile}
        error={uploadError}
      />
      
      {/* File information */}
      {selectedFile && !uploadError && (
        <div className="p-4 bg-zinc-900 rounded-md border border-zinc-800">
          <div className="flex items-center">
            <FileIcon className="h-8 w-8 text-tan mr-3" />
            <div>
              <p className="text-sm font-medium text-zinc-200">{selectedFile.name}</p>
              <p className="text-xs text-zinc-400">
                {(selectedFile.size / 1024).toFixed(2)} KB • {selectedFile.type}
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* Actions */}
      <div className="flex justify-end">
        <Button 
          onClick={handleValidateFile} 
          disabled={!selectedFile || isUploading}
          className="bg-tan text-zinc-950 hover:bg-tan/90"
        >
          {isUploading ? (
            <>
              <span className="animate-spin mr-2">◌</span>
              Validating...
            </>
          ) : (
            <>
              <UploadIcon className="mr-2 h-4 w-4" />
              Validate File
            </>
          )}
        </Button>
      </div>
    </div>
  );
}