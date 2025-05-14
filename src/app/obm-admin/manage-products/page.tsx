// src/app/obm-admin/manage-products/page.tsx
"use client";

import React from 'react';
import Link from 'next/link';
import { DataTable } from "@/components/admin/dashboard/data-table";
import data from "../../obm-admin/data.json";
import { Button } from "@/components/ui/button";
import { UploadIcon, PlusIcon } from "lucide-react";

export default function ManageProducts() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-tan">Manage Products</h1>
        <div className="flex gap-3">
          <Button asChild variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white">
            <Link href="/obm-admin/manage-products/bulk-upload">
              <UploadIcon className="mr-2 h-4 w-4" />
              Bulk Upload
            </Link>
          </Button>
          <Button asChild className="bg-tan text-zinc-950 hover:bg-tan/90">
            <Link href="/obm-admin/manage-products/add">
              <PlusIcon className="mr-2 h-4 w-4" />
              Add Product
            </Link>
          </Button>
        </div>
      </div>
      <DataTable data={data} />
    </div>
  );
}