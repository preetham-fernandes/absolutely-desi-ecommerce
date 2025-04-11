import React from 'react'
import { DataTable } from "@/components/admin/dashboard/data-table"
import data from "../../obm-admin/data.json"


export default function ManageOrders() {
  return (
    <div>
      <DataTable data={data} />
    </div>
  )
}

