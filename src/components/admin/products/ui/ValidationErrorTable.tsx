// src/components/admin/products/ui/ValidationErrorTable.tsx
"use client";

import { AlertTriangleIcon, AlertCircleIcon } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export type ValidationError = {
  row: number;
  field: string;
  message: string;
  value?: string;
};

interface ValidationErrorTableProps {
  errors: ValidationError[];
  isWarning?: boolean;
}

export default function ValidationErrorTable({ errors, isWarning = false }: ValidationErrorTableProps) {
  const iconColor = isWarning ? "text-yellow-500" : "text-red-500";
  const bgColor = isWarning ? "bg-yellow-900/10" : "bg-red-900/10";
  const borderColor = isWarning ? "border-yellow-900" : "border-red-900";
  
  return (
    <div className={`rounded-md ${bgColor} border ${borderColor} overflow-hidden`}>
      <div className="max-h-[400px] overflow-y-auto">
        <Table>
          <TableHeader className="bg-black/30 sticky top-0 z-10">
            <TableRow>
              <TableHead className="w-16 text-zinc-400">Row</TableHead>
              <TableHead className="w-32 text-zinc-400">Field</TableHead>
              <TableHead className="text-zinc-400">Issue</TableHead>
              <TableHead className="w-1/4 text-zinc-400">Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {errors.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-4 text-zinc-500">
                  No issues found
                </TableCell>
              </TableRow>
            ) : (
              errors.map((error, index) => (
                <TableRow key={index} className="border-b border-zinc-800/50">
                  <TableCell className="font-mono text-zinc-300">
                    {error.row}
                  </TableCell>
                  <TableCell className="font-medium text-zinc-300">
                    {error.field}
                  </TableCell>
                  <TableCell className="flex items-start gap-2 text-zinc-300">
                    {isWarning ? (
                      <AlertTriangleIcon className={`h-4 w-4 mt-0.5 flex-shrink-0 ${iconColor}`} />
                    ) : (
                      <AlertCircleIcon className={`h-4 w-4 mt-0.5 flex-shrink-0 ${iconColor}`} />
                    )}
                    {error.message}
                  </TableCell>
                  <TableCell className="font-mono text-xs text-zinc-400 max-w-64 truncate">
                    {error.value || '-'}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}