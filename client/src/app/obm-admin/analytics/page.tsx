import React from 'react'
import {VisitorsPieChart} from "@/components/admin/analytics/visitors-pie-chart"
import { MonthlySalesChart } from '@/components/admin/analytics/monthly-sales-chart'
import { BarChartComponent } from '@/components/admin/analytics/barchart'

export default function Analytics
() {
  return (
    <div className="flex flex-wrap w-full py-4 md:gap-6 md:py-6">
    <div className="w-full md:w-1/3">
      <VisitorsPieChart />
    </div>
    <div className="w-full md:w-1/3">
      <MonthlySalesChart />
    </div>
    <div className="w-full md:w-1/3">
      <VisitorsPieChart />
    </div>
    <div className="w-full">
      <BarChartComponent/>
    </div>
  </div>
  )
}

