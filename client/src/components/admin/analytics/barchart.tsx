"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { date: "2024-04-01", men: 222, women: 150 },
  { date: "2024-04-02", men: 97, women: 180 },
  { date: "2024-04-03", men: 167, women: 120 },
  { date: "2024-04-04", men: 242, women: 260 },
  { date: "2024-04-05", men: 373, women: 290 },
  { date: "2024-04-06", men: 301, women: 340 },
  { date: "2024-04-07", men: 245, women: 180 },
  { date: "2024-04-08", men: 409, women: 320 },
  { date: "2024-04-09", men: 59, women: 110 },
  { date: "2024-04-10", men: 261, women: 190 },
  { date: "2024-04-11", men: 327, women: 350 },
  { date: "2024-04-12", men: 292, women: 210 },
  { date: "2024-04-13", men: 342, women: 380 },
  { date: "2024-04-14", men: 137, women: 220 },
  { date: "2024-04-15", men: 120, women: 170 },
  { date: "2024-04-16", men: 138, women: 190 },
  { date: "2024-04-17", men: 446, women: 360 },
  { date: "2024-04-18", men: 364, women: 410 },
  { date: "2024-04-19", men: 243, women: 180 },
  { date: "2024-04-20", men: 89, women: 150 },
  { date: "2024-04-21", men: 137, women: 200 },
  { date: "2024-04-22", men: 224, women: 170 },
  { date: "2024-04-23", men: 138, women: 230 },
  { date: "2024-04-24", men: 387, women: 290 },
  { date: "2024-04-25", men: 215, women: 250 },
  { date: "2024-04-26", men: 75, women: 130 },
  { date: "2024-04-27", men: 383, women: 420 },
  { date: "2024-04-28", men: 122, women: 180 },
  { date: "2024-04-29", men: 315, women: 240 },
  { date: "2024-04-30", men: 454, women: 380 },
  { date: "2024-05-01", men: 165, women: 220 },
  { date: "2024-05-02", men: 293, women: 310 },
  { date: "2024-05-03", men: 247, women: 190 },
  { date: "2024-05-04", men: 385, women: 420 },
  { date: "2024-05-05", men: 481, women: 390 },
  { date: "2024-05-06", men: 498, women: 520 },
  { date: "2024-05-07", men: 388, women: 300 },
  { date: "2024-05-08", men: 149, women: 210 },
  { date: "2024-05-09", men: 227, women: 180 },
  { date: "2024-05-10", men: 293, women: 330 },
  { date: "2024-05-11", men: 335, women: 270 },
  { date: "2024-05-12", men: 197, women: 240 },
  { date: "2024-05-13", men: 197, women: 160 },
  { date: "2024-05-14", men: 448, women: 490 },
  { date: "2024-05-15", men: 473, women: 380 },
  { date: "2024-05-16", men: 338, women: 400 },
  { date: "2024-05-17", men: 499, women: 420 },
  { date: "2024-05-18", men: 315, women: 350 },
  { date: "2024-05-19", men: 235, women: 180 },
  { date: "2024-05-20", men: 177, women: 230 },
  { date: "2024-05-21", men: 82, women: 140 },
  { date: "2024-05-22", men: 81, women: 120 },
  { date: "2024-05-23", men: 252, women: 290 },
  { date: "2024-05-24", men: 294, women: 220 },
  { date: "2024-05-25", men: 201, women: 250 },
  { date: "2024-05-26", men: 213, women: 170 },
  { date: "2024-05-27", men: 420, women: 460 },
  { date: "2024-05-28", men: 233, women: 190 },
  { date: "2024-05-29", men: 78, women: 130 },
  { date: "2024-05-30", men: 340, women: 280 },
  { date: "2024-05-31", men: 178, women: 230 },
  { date: "2024-06-01", men: 178, women: 200 },
  { date: "2024-06-02", men: 470, women: 410 },
  { date: "2024-06-03", men: 103, women: 160 },
  { date: "2024-06-04", men: 439, women: 380 },
  { date: "2024-06-05", men: 88, women: 140 },
  { date: "2024-06-06", men: 294, women: 250 },
  { date: "2024-06-07", men: 323, women: 370 },
  { date: "2024-06-08", men: 385, women: 320 },
  { date: "2024-06-09", men: 438, women: 480 },
  { date: "2024-06-10", men: 155, women: 200 },
  { date: "2024-06-11", men: 92, women: 150 },
  { date: "2024-06-12", men: 492, women: 420 },
  { date: "2024-06-13", men: 81, women: 130 },
  { date: "2024-06-14", men: 426, women: 380 },
  { date: "2024-06-15", men: 307, women: 350 },
  { date: "2024-06-16", men: 371, women: 310 },
  { date: "2024-06-17", men: 475, women: 520 },
  { date: "2024-06-18", men: 107, women: 170 },
  { date: "2024-06-19", men: 341, women: 290 },
  { date: "2024-06-20", men: 408, women: 450 },
  { date: "2024-06-21", men: 169, women: 210 },
  { date: "2024-06-22", men: 317, women: 270 },
  { date: "2024-06-23", men: 480, women: 530 },
  { date: "2024-06-24", men: 132, women: 180 },
  { date: "2024-06-25", men: 141, women: 190 },
  { date: "2024-06-26", men: 434, women: 380 },
  { date: "2024-06-27", men: 448, women: 490 },
  { date: "2024-06-28", men: 149, women: 200 },
  { date: "2024-06-29", men: 103, women: 160 },
  { date: "2024-06-30", men: 446, women: 400 },
]

const chartConfig = {
  views: {
    label: "Page Views",
  },
  men: {
    label: "Men",
    color: "hsl(var(--chart-1))",
  },
  women: {
    label: "Women",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function BarChartComponent() {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("men")

  const total = React.useMemo(
    () => ({
      men: chartData.reduce((acc, curr) => acc + curr.men, 0),
      women: chartData.reduce((acc, curr) => acc + curr.women, 0),
    }),
    []
  )

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Bar Chart - Users</CardTitle>
          <CardDescription>
            Showing total affiliates for the last 3 months
          </CardDescription>
        </div>
        <div className="flex">
          {["men", "women"].map((key) => {
            const chart = key as keyof typeof chartConfig
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            )
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }}
                />
              }
            />
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}