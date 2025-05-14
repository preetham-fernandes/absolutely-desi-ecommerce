// src/components/admin/products/BulkUploadForm.tsx
"use client";

import { useState, createContext, useContext } from "react";
import CategorySelectionStep from "./steps/CategorySelectionStep";
import FileUploadStep from "./steps/FileUploadStep";
import ValidationReviewStep from "./steps/ValidationReviewStep";
import ProcessingStep from "./steps/ProcessingStep";
import CompletionStep from "./steps/CompletionStep";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckIcon, FileTextIcon, UploadIcon, ClipboardCheckIcon, ServerIcon } from "lucide-react";

// Types
export type FileValidationResult = {
  success: boolean;
  errors?: any[];
  warnings?: any[];
  validRows?: number;
  totalRows?: number;
  errorRows?: number;
  warningRows?: number;
  sessionId?: string;
};

export type ProcessingResult = {
  productsCreated: number;
  variantsCreated: number;
  attributesCreated: number;
  imagesUploaded: number;
  timeElapsed: number;
};

export type BulkUploadContextType = {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  selectedCategoryId: number | null;
  setSelectedCategoryId: (id: number | null) => void;
  selectedFile: File | null;
  setSelectedFile: (file: File | null) => void;
  validationResult: FileValidationResult | null;
  setValidationResult: (result: FileValidationResult | null) => void;
  processingResult: ProcessingResult | null;
  setProcessingResult: (result: ProcessingResult | null) => void;
  nextStep: () => void;
  prevStep: () => void;
};

// Create context
export const BulkUploadContext = createContext<BulkUploadContextType | undefined>(undefined);

// Hook to use context
export const useBulkUpload = () => {
  const context = useContext(BulkUploadContext);
  if (!context) {
    throw new Error("useBulkUpload must be used within a BulkUploadProvider");
  }
  return context;
};

export default function BulkUploadForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [validationResult, setValidationResult] = useState<FileValidationResult | null>(null);
  const [processingResult, setProcessingResult] = useState<ProcessingResult | null>(null);

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 5));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const contextValue: BulkUploadContextType = {
    currentStep,
    setCurrentStep,
    selectedCategoryId,
    setSelectedCategoryId,
    selectedFile,
    setSelectedFile,
    validationResult,
    setValidationResult,
    processingResult,
    setProcessingResult,
    nextStep,
    prevStep,
  };

  // Define step components with their titles and icons
  const steps = [
    {
      number: 1,
      title: "Select Category",
      icon: <ClipboardCheckIcon className="h-5 w-5" />,
      component: <CategorySelectionStep />,
    },
    {
      number: 2,
      title: "Upload File",
      icon: <UploadIcon className="h-5 w-5" />,
      component: <FileUploadStep />,
    },
    {
      number: 3,
      title: "Validation Review",
      icon: <FileTextIcon className="h-5 w-5" />,
      component: <ValidationReviewStep />,
    },
    {
      number: 4,
      title: "Processing",
      icon: <ServerIcon className="h-5 w-5" />,
      component: <ProcessingStep />,
    },
    {
      number: 5,
      title: "Completion",
      icon: <CheckIcon className="h-5 w-5" />,
      component: <CompletionStep />,
    },
  ];

  return (
    <BulkUploadContext.Provider value={contextValue}>
      <div className="container mx-auto py-6">
        <Card className="bg-zinc-950 border border-zinc-800 text-white">
          <CardHeader className="border-b border-zinc-800">
            <CardTitle className="text-2xl font-serif text-tan">Bulk Product Upload</CardTitle>
            <CardDescription className="text-gray-400">
              Upload multiple products with variants in a single operation
            </CardDescription>
          </CardHeader>

          {/* Progress indicator */}
          <div className="border-b border-zinc-800">
            <div className="flex mx-auto py-4 px-6">
              {steps.map((step) => (
                <div key={step.number} className="flex-1 flex items-center">
                  <div
                    className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ${
                      step.number < currentStep
                        ? "bg-tan"
                        : step.number === currentStep
                        ? "bg-tan/20 border-2 border-tan"
                        : "bg-zinc-800"
                    } ${step.number !== 1 ? "ml-7 sm:ml-14" : ""}`}
                  >
                    {step.number < currentStep ? (
                      <CheckIcon className="h-5 w-5 text-zinc-950" />
                    ) : (
                      <span
                        className={`text-sm font-medium ${
                          step.number === currentStep ? "text-tan" : "text-zinc-400"
                        }`}
                      >
                        {step.number}
                      </span>
                    )}
                  </div>

                  {/* Connector line */}
                  {step.number < steps.length && (
                    <div
                      className={`h-0.5 w-full ${
                        step.number < currentStep ? "bg-tan" : "bg-zinc-800"
                      }`}
                    ></div>
                  )}

                  {/* Step title - only show on larger screens */}
                  <span
                    className={`absolute mt-12 hidden text-xs ${
                      step.number === currentStep ? "text-tan font-medium" : "text-zinc-400"
                    } sm:block`}
                  >
                    {step.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <CardContent className="py-6">
            {/* Render current step component */}
            {steps.find((step) => step.number === currentStep)?.component}
          </CardContent>

          <CardFooter className="border-t border-zinc-800 gap-2 justify-between">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1 || currentStep === 4}
              className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white"
            >
              Previous
            </Button>
            
            {/* Next button is handled inside each step component */}
          </CardFooter>
        </Card>
      </div>
    </BulkUploadContext.Provider>
  );
}