// src/components/admin/products/steps/ProcessingStep.tsx
"use client";

import { useState, useEffect } from "react";
import { useBulkUpload } from "../BulkUploadForm";
import { Button } from "@/components/ui/button";
import { AlertCircleIcon, ServerIcon, RefreshCwIcon, LightbulbIcon } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function ProcessingStep() {
  const { 
    validationResult, 
    setProcessingResult, 
    nextStep 
  } = useBulkUpload();
  
  const [progress, setProgress] = useState(0);
  const [currentOperation, setCurrentOperation] = useState("Initializing...");
  const [currentBatch, setCurrentBatch] = useState(0);
  const [totalBatches, setTotalBatches] = useState(0);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isTimedOut, setIsTimedOut] = useState(false);
  
  // Process status check interval (in milliseconds)
  const POLL_INTERVAL = 2000;
  
  // Check process status
  const checkProcessStatus = async (sessionId: string) => {
    try {
      const response = await fetch(`/api/admin/products/process-status?sessionId=${sessionId}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to check process status');
      }
      
      const data = await response.json();
      
      // Update progress state
      setProgress(data.data.progress);
      setCurrentOperation(data.data.currentOperation || "Processing...");
      setCurrentBatch(data.data.currentBatch || 0);
      setTotalBatches(data.data.totalBatches || 0);
      
      // Check if process completed
      if (data.data.status === 'completed') {
        // Store results in context
        setProcessingResult({
          productsCreated: data.data.productsCreated || 0,
          variantsCreated: data.data.variantsCreated || 0,
          attributesCreated: data.data.attributesCreated || 0,
          imagesUploaded: data.data.imagesUploaded || 0,
          timeElapsed: data.data.timeElapsed || 0,
        });
        
        // Move to next step
        nextStep();
        return true;
      }
      
      // Check if process failed
      if (data.data.status === 'failed') {
        setIsError(true);
        setErrorMessage(data.data.error || 'Processing failed');
        return true;
      }
      
      // Check if process timed out
      if (data.data.status === 'timeout') {
        setIsTimedOut(true);
        return true;
      }
      
      // Still in progress
      return false;
      
    } catch (error) {
      console.error('Error checking process status:', error);
      setIsError(true);
      setErrorMessage(error instanceof Error ? error.message : 'Failed to check process status');
      return true;
    }
  };
  
  // Start polling for status updates
  useEffect(() => {
    if (!validationResult?.sessionId) {
      setIsError(true);
      setErrorMessage('No session ID found. Please restart the upload process.');
      return;
    }
    
    let isMounted = true;
    const sessionId = validationResult.sessionId;
    let pollInterval: NodeJS.Timeout;
    
    const startPolling = async () => {
      // Initial status check
      const isDone = await checkProcessStatus(sessionId);
      
      if (isDone || !isMounted) return;
      
      // Start polling
      pollInterval = setInterval(async () => {
        const isDone = await checkProcessStatus(sessionId);
        
        if (isDone && isMounted) {
          clearInterval(pollInterval);
        }
      }, POLL_INTERVAL);
    };
    
    startPolling();
    
    // Cleanup
    return () => {
      isMounted = false;
      if (pollInterval) {
        clearInterval(pollInterval);
      }
    };
  }, [validationResult?.sessionId]);
  
  // Resume processing (for timeout case)
  const handleResumeProcessing = async () => {
    if (!validationResult?.sessionId) return;
    
    try {
      // Reset states
      setIsTimedOut(false);
      
      // Send resume request
      const response = await fetch(`/api/admin/products/process-resume`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId: validationResult.sessionId,
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to resume processing');
      }
      
      // Start checking status again
      checkProcessStatus(validationResult.sessionId);
      
    } catch (error) {
      console.error('Error resuming processing:', error);
      setIsError(true);
      setErrorMessage(error instanceof Error ? error.message : 'Failed to resume processing');
    }
  };
  
  // If no validation result
  if (!validationResult) {
    return (
      <div className="text-center py-12">
        <AlertCircleIcon className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-xl font-medium mb-2 text-white">No Data to Process</h3>
        <p className="text-zinc-400 mb-6">
          There is no validation data to process. Please restart the upload process.
        </p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium text-tan">Processing Products</h3>
        <p className="text-sm text-zinc-400">
          Your products are being processed. This may take a few minutes depending on the size of your file.
        </p>
      </div>
      
      {/* Processing status */}
      <div className="p-6 bg-zinc-900 rounded-md border border-zinc-800 space-y-6">
        {isError ? (
          <div className="text-center py-4">
            <AlertCircleIcon className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-medium mb-2 text-white">Processing Error</h3>
            <p className="text-zinc-400 mb-6">
              {errorMessage || 'An error occurred during processing. Please try again.'}
            </p>
          </div>
        ) : isTimedOut ? (
          <div className="text-center py-4">
            <LightbulbIcon className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-xl font-medium mb-2 text-white">Processing Timed Out</h3>
            <p className="text-zinc-400 mb-6">
              The processing operation timed out. This might happen with large files. 
              You can resume processing from where it left off.
            </p>
            <Button
              onClick={handleResumeProcessing}
              className="bg-yellow-600 text-white hover:bg-yellow-700"
            >
              <RefreshCwIcon className="mr-2 h-4 w-4" />
              Resume Processing
            </Button>
          </div>
        ) : (
          <>
            {/* Progress bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">Overall Progress</span>
                <span className="text-zinc-300">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2 bg-zinc-800" />
            </div>
            
            {/* Current operation */}
            <div className="flex justify-between text-sm items-center">
              <div>
                <span className="text-zinc-400 mr-2">Current Operation:</span>
                <span className="text-zinc-300">{currentOperation}</span>
              </div>
              <div className="flex items-center">
                <ServerIcon className="h-4 w-4 text-tan mr-2 animate-pulse" />
                <span className="text-zinc-300">
                  Batch {currentBatch} of {totalBatches || '?'}
                </span>
              </div>
            </div>
            
            {/* Tips */}
            <Alert className="bg-zinc-800/50 border-zinc-700">
              <LightbulbIcon className="h-4 w-4 text-yellow-500" />
              <AlertTitle>Processing Tip</AlertTitle>
              <AlertDescription className="text-zinc-400">
                Large files may take several minutes to process. You can leave this page open 
                in the background and return later to check progress.
              </AlertDescription>
            </Alert>
          </>
        )}
      </div>
    </div>
  );
}