// src/components/admin/products/ui/FileDropzone.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { UploadIcon, FileTextIcon, AlertCircleIcon } from "lucide-react";

interface FileDropzoneProps {
  onFileDrop: (file: File) => void;
  selectedFile: File | null;
  error: string | null;
}

export default function FileDropzone({ onFileDrop, selectedFile, error }: FileDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const dropzoneRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Handle file selection change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onFileDrop(files[0]);
    }
  };
  
  // Handle file drop
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      onFileDrop(files[0]);
    }
  };
  
  // Handle drag events
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };
  
  // Open file dialog when clicking on the dropzone
  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  return (
    <div
      ref={dropzoneRef}
      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors duration-200 ${
        isDragging 
          ? 'border-tan bg-tan/10' 
          : error 
            ? 'border-red-500 bg-red-900/10' 
            : selectedFile 
              ? 'border-green-500 bg-green-900/10' 
              : 'border-zinc-700 hover:border-zinc-500 bg-zinc-900'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept=".csv,.xlsx,.xls"
        onChange={handleFileChange}
      />
      
      <div className="flex flex-col items-center justify-center">
        {error ? (
          <>
            <div className="rounded-full bg-red-900/20 p-3 mb-4">
              <AlertCircleIcon className="h-6 w-6 text-red-500" />
            </div>
            <p className="text-red-500 font-medium">{error}</p>
            <p className="text-sm text-zinc-400 mt-2">
              Please select a valid CSV or Excel file
            </p>
          </>
        ) : selectedFile ? (
          <>
            <div className="rounded-full bg-green-900/20 p-3 mb-4">
              <FileTextIcon className="h-6 w-6 text-green-500" />
            </div>
            <p className="text-green-500 font-medium">File Selected</p>
            <p className="text-sm text-zinc-400 mt-2">
              Click to change file or drag and drop a new one
            </p>
          </>
        ) : (
          <>
            <div className="rounded-full bg-zinc-800 p-3 mb-4">
              <UploadIcon className="h-6 w-6 text-zinc-400" />
            </div>
            <p className="text-zinc-300 font-medium">
              Drag & drop file here or click to browse
            </p>
            <p className="text-sm text-zinc-500 mt-2">
              Supported formats: CSV, Excel (.xlsx, .xls) • Max 10MB
            </p>
          </>
        )}
      </div>
    </div>
  );
}