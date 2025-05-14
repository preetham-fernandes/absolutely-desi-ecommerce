// src/components/admin/products/steps/ValidationReviewStep.tsx
"use client";

import { useState } from "react";
import { useBulkUpload } from "../BulkUploadForm";
import { Button } from "@/components/ui/button";
import { AlertCircleIcon, FileIcon, CheckCircleIcon, XCircleIcon, UploadIcon } from "lucide-react";
import ValidationErrorTable from "../ui/ValidationErrorTable";

export default function ValidationReviewStep() {
  const { 
    selectedFile, 
    validationResult, 
    nextStep, 
    prevStep 
  } = useBulkUpload();
  
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Check if we have validation results
  if (!validationResult) {
    return (
      <div className="text-center py-12">
        <AlertCircleIcon className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-xl font-medium mb-2 text-white">No Validation Results</h3>
        <p className="text-zinc-400 mb-6">
          There are no validation results to display. Please go back and upload a file.
        </p>
        <Button
          onClick={prevStep}
          className="bg-zinc-800 text-white hover:bg-zinc-700"
        >
          Back to Upload
        </Button>
      </div>
    );
  }
  
  const hasErrors = validationResult.errors && validationResult.errors.length > 0;
  
  // Proceed with valid entries
  const handleContinue = async () => {
    try {
      setIsProcessing(true);
      
      // Here you would call the API to start processing the valid rows
      // This endpoint should return a session ID or similar for tracking progress
      const response = await fetch('/api/admin/products/process', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId: validationResult.sessionId,
          proceedWithValid: true,
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Processing failed');
      }
      
      // Move to processing step
      nextStep();
      
    } catch (error) {
      console.error('Error starting processing:', error);
      // Handle error
    } finally {
      setIsProcessing(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium text-tan">Validation Results</h3>
        <p className="text-sm text-zinc-400">
          Review the validation results before proceeding. Fix any errors or proceed with valid entries only.
        </p>
      </div>
      
      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-zinc-900 rounded-md border border-zinc-800">
          <div className="text-sm text-zinc-400 mb-1">Total Rows</div>
          <div className="text-2xl font-semibold text-white">{validationResult.totalRows || 0}</div>
        </div>
        
        <div className="p-4 bg-zinc-900 rounded-md border border-zinc-800">
          <div className="text-sm text-zinc-400 mb-1">Valid Rows</div>
          <div className="text-2xl font-semibold text-green-500">{validationResult.validRows || 0}</div>
        </div>
        
        <div className="p-4 bg-zinc-900 rounded-md border border-zinc-800">
          <div className="text-sm text-zinc-400 mb-1">Rows with Errors</div>
          <div className="text-2xl font-semibold text-red-500">{validationResult.errorRows || 0}</div>
        </div>
        
        <div className="p-4 bg-zinc-900 rounded-md border border-zinc-800">
          <div className="text-sm text-zinc-400 mb-1">Rows with Warnings</div>
          <div className="text-2xl font-semibold text-yellow-500">{validationResult.warningRows || 0}</div>
        </div>
      </div>
      
      {/* File info */}
      {selectedFile && (
        <div className="p-4 bg-zinc-900 rounded-md border border-zinc-800">
          <div className="flex items-center">
            <FileIcon className="h-6 w-6 text-zinc-400 mr-3" />
            <div>
              <p className="text-sm font-medium text-zinc-200">{selectedFile.name}</p>
              <p className="text-xs text-zinc-400">
                {(selectedFile.size / 1024).toFixed(2)} KB • {selectedFile.type}
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* Error table */}
      {hasErrors && (
        <div className="space-y-2">
          <h4 className="text-md font-medium text-white">Errors</h4>
          <ValidationErrorTable errors={validationResult.errors || []} />
        </div>
      )}
      
      {/* Warning table - similar to error table */}
      {validationResult.warnings && validationResult.warnings.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-md font-medium text-white">Warnings</h4>
          <ValidationErrorTable errors={validationResult.warnings} isWarning />
        </div>
      )}
      
      {/* Actions */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={prevStep}
          className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white"
        >
          <XCircleIcon className="mr-2 h-4 w-4" />
          Fix and Re-upload
        </Button>
        
        <Button 
          onClick={handleContinue} 
          disabled={isProcessing || validationResult.validRows === 0}
          className={`
            ${validationResult.validRows === 0 
              ? 'bg-zinc-700 cursor-not-allowed' 
              : 'bg-tan text-zinc-950 hover:bg-tan/90'
            }
          `}
        >
          {isProcessing ? (
            <>
              <span className="animate-spin mr-2">◌</span>
              Starting...
            </>
          ) : (
            <>
              <CheckCircleIcon className="mr-2 h-4 w-4" />
              {hasErrors 
                ? `Continue with Valid Entries (${validationResult.validRows})`
                : 'Process All Entries'
              }
            </>
          )}
        </Button>
      </div>
    </div>
  );
}