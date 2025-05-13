"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import { useIsMobile } from "@/hooks/use-mobile"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"

const chartData = [
  { date: "2024-04-01", lehenga: 222, kurta: 150 },
  { date: "2024-04-02", lehenga: 97, kurta: 180 },
  { date: "2024-04-03", lehenga: 167, kurta: 120 },
  { date: "2024-04-04", lehenga: 242, kurta: 260 },
  { date: "2024-04-05", lehenga: 373, kurta: 290 },
  { date: "2024-04-06", lehenga: 301, kurta: 340 },
  { date: "2024-04-07", lehenga: 245, kurta: 180 },
  { date: "2024-04-08", lehenga: 409, kurta: 320 },
  { date: "2024-04-09", lehenga: 59, kurta: 110 },
  { date: "2024-04-10", lehenga: 261, kurta: 190 },
  { date: "2024-04-11", lehenga: 327, kurta: 350 },
  { date: "2024-04-12", lehenga: 292, kurta: 210 },
  { date: "2024-04-13", lehenga: 342, kurta: 380 },
  { date: "2024-04-14", lehenga: 137, kurta: 220 },
  { date: "2024-04-15", lehenga: 120, kurta: 170 },
  { date: "2024-04-16", lehenga: 138, kurta: 190 },
  { date: "2024-04-17", lehenga: 446, kurta: 360 },
  { date: "2024-04-18", lehenga: 364, kurta: 410 },
  { date: "2024-04-19", lehenga: 243, kurta: 180 },
  { date: "2024-04-20", lehenga: 89, kurta: 150 },
  { date: "2024-04-21", lehenga: 137, kurta: 200 },
  { date: "2024-04-22", lehenga: 224, kurta: 170 },
  { date: "2024-04-23", lehenga: 138, kurta: 230 },
  { date: "2024-04-24", lehenga: 387, kurta: 290 },
  { date: "2024-04-25", lehenga: 215, kurta: 250 },
  { date: "2024-04-26", lehenga: 75, kurta: 130 },
  { date: "2024-04-27", lehenga: 383, kurta: 420 },
  { date: "2024-04-28", lehenga: 122, kurta: 180 },
  { date: "2024-04-29", lehenga: 315, kurta: 240 },
  { date: "2024-04-30", lehenga: 454, kurta: 380 },
  { date: "2024-05-01", lehenga: 165, kurta: 220 },
  { date: "2024-05-02", lehenga: 293, kurta: 310 },
  { date: "2024-05-03", lehenga: 247, kurta: 190 },
  { date: "2024-05-04", lehenga: 385, kurta: 420 },
  { date: "2024-05-05", lehenga: 481, kurta: 390 },
  { date: "2024-05-06", lehenga: 498, kurta: 520 },
  { date: "2024-05-07", lehenga: 388, kurta: 300 },
  { date: "2024-05-08", lehenga: 149, kurta: 210 },
  { date: "2024-05-09", lehenga: 227, kurta: 180 },
  { date: "2024-05-10", lehenga: 293, kurta: 330 },
  { date: "2024-05-11", lehenga: 335, kurta: 270 },
  { date: "2024-05-12", lehenga: 197, kurta: 240 },
  { date: "2024-05-13", lehenga: 197, kurta: 160 },
  { date: "2024-05-14", lehenga: 448, kurta: 490 },
  { date: "2024-05-15", lehenga: 473, kurta: 380 },
  { date: "2024-05-16", lehenga: 338, kurta: 400 },
  { date: "2024-05-17", lehenga: 499, kurta: 420 },
  { date: "2024-05-18", lehenga: 315, kurta: 350 },
  { date: "2024-05-19", lehenga: 235, kurta: 180 },
  { date: "2024-05-20", lehenga: 177, kurta: 230 },
  { date: "2024-05-21", lehenga: 82, kurta: 140 },
  { date: "2024-05-22", lehenga: 81, kurta: 120 },
  { date: "2024-05-23", lehenga: 252, kurta: 290 },
  { date: "2024-05-24", lehenga: 294, kurta: 220 },
  { date: "2024-05-25", lehenga: 201, kurta: 250 },
  { date: "2024-05-26", lehenga: 213, kurta: 170 },
  { date: "2024-05-27", lehenga: 420, kurta: 460 },
  { date: "2024-05-28", lehenga: 233, kurta: 190 },
  { date: "2024-05-29", lehenga: 78, kurta: 130 },
  { date: "2024-05-30", lehenga: 340, kurta: 280 },
  { date: "2024-05-31", lehenga: 178, kurta: 230 },
  { date: "2024-06-01", lehenga: 178, kurta: 200 },
  { date: "2024-06-02", lehenga: 470, kurta: 410 },
  { date: "2024-06-03", lehenga: 103, kurta: 160 },
  { date: "2024-06-04", lehenga: 439, kurta: 380 },
  { date: "2024-06-05", lehenga: 88, kurta: 140 },
  { date: "2024-06-06", lehenga: 294, kurta: 250 },
  { date: "2024-06-07", lehenga: 323, kurta: 370 },
  { date: "2024-06-08", lehenga: 385, kurta: 320 },
  { date: "2024-06-09", lehenga: 438, kurta: 480 },
  { date: "2024-06-10", lehenga: 155, kurta: 200 },
  { date: "2024-06-11", lehenga: 92, kurta: 150 },
  { date: "2024-06-12", lehenga: 492, kurta: 420 },
  { date: "2024-06-13", lehenga: 81, kurta: 130 },
  { date: "2024-06-14", lehenga: 426, kurta: 380 },
  { date: "2024-06-15", lehenga: 307, kurta: 350 },
  { date: "2024-06-16", lehenga: 371, kurta: 310 },
  { date: "2024-06-17", lehenga: 475, kurta: 520 },
  { date: "2024-06-18", lehenga: 107, kurta: 170 },
  { date: "2024-06-19", lehenga: 341, kurta: 290 },
  { date: "2024-06-20", lehenga: 408, kurta: 450 },
  { date: "2024-06-21", lehenga: 169, kurta: 210 },
  { date: "2024-06-22", lehenga: 317, kurta: 270 },
  { date: "2024-06-23", lehenga: 480, kurta: 530 },
  { date: "2024-06-24", lehenga: 132, kurta: 180 },
  { date: "2024-06-25", lehenga: 141, kurta: 190 },
  { date: "2024-06-26", lehenga: 434, kurta: 380 },
  { date: "2024-06-27", lehenga: 448, kurta: 490 },
  { date: "2024-06-28", lehenga: 149, kurta: 200 },
  { date: "2024-06-29", lehenga: 103, kurta: 160 },
  { date: "2024-06-30", lehenga: 446, kurta: 400 },
]

// Updated chart config with our custom colors
const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  lehenga: {
    label: "Lehenga",
    color: "#D2B48C", // Tan color
  },
  kurta: {
    label: "Kurta",
    color: "#C1E2DF", // Pastel teal color
  },
} satisfies ChartConfig

export function ChartAreaInteractive() {
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = React.useState("30d")

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d")
    }
  }, [isMobile])

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date("2024-06-30")
    let daysToSubtract = 90
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  return (
    <Card className="@container/card bg-zinc-950 border border-zinc-800 text-white">
      <CardHeader className="relative">
        <CardTitle className="text-tan font-serif">Product Sales</CardTitle>
        <CardDescription className="text-gray-400">
          <span className="@[540px]/card:block hidden">
            Total sales for the selected period
          </span>
          <span className="@[540px]/card:hidden">Sales statistics</span>
        </CardDescription>
        <div className="absolute right-4 top-4">
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="@[767px]/card:flex hidden border border-zinc-800"
          >
            <ToggleGroupItem 
              value="90d" 
              className={`h-8 px-2.5 text-xs ${timeRange === '90d' ? 'bg-tan/20 text-tan' : 'text-gray-400 hover:text-teal hover:bg-zinc-900'}`}
            >
              Last 3 months
            </ToggleGroupItem>
            <ToggleGroupItem 
              value="30d" 
              className={`h-8 px-2.5 text-xs ${timeRange === '30d' ? 'bg-tan/20 text-tan' : 'text-gray-400 hover:text-teal hover:bg-zinc-900'}`}
            >
              Last 30 days
            </ToggleGroupItem>
            <ToggleGroupItem 
              value="7d" 
              className={`h-8 px-2.5 text-xs ${timeRange === '7d' ? 'bg-tan/20 text-tan' : 'text-gray-400 hover:text-teal hover:bg-zinc-900'}`}
            >
              Last 7 days
            </ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="@[767px]/card:hidden flex w-40 bg-zinc-900 border-zinc-800 text-white"
              aria-label="Select a time range"
            >
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
              <SelectItem value="90d" className="hover:bg-zinc-800 focus:bg-zinc-800 hover:text-tan focus:text-tan">
                Last 3 months
              </SelectItem>
              <SelectItem value="30d" className="hover:bg-zinc-800 focus:bg-zinc-800 hover:text-tan focus:text-tan">
                Last 30 days
              </SelectItem>
              <SelectItem value="7d" className="hover:bg-zinc-800 focus:bg-zinc-800 hover:text-tan focus:text-tan">
                Last 7 days
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[300px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillLehenga" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="#D2B48C"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="#D2B48C"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillKurta" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="#C1E2DF"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="#C1E2DF"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="#333333" strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#999999" }}
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
              cursor={false}
              content={
                <ChartTooltipContent
                  className="bg-zinc-900 border border-zinc-800 text-white"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="kurta"
              type="natural"
              fill="url(#fillKurta)"
              stroke="#C1E2DF"
              strokeWidth={2}
              stackId="a"
            />
            <Area
              dataKey="lehenga"
              type="natural"
              fill="url(#fillLehenga)"
              stroke="#D2B48C"
              strokeWidth={2}
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
        
        <div className="flex justify-center space-x-6 mt-6">
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-sm mr-2" style={{ backgroundColor: '#D2B48C' }}></span>
            <span className="text-sm text-gray-300">Lehenga</span>
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-sm mr-2" style={{ backgroundColor: '#C1E2DF' }}></span>
            <span className="text-sm text-gray-300">Kurta</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}