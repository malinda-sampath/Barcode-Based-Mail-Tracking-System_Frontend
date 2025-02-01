"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../../../components/ui/chart"

export const description = "An interactive bar chart"

const chartData = [
  { date: "2024-04-01", Recieved: 222,  Rejected: 150 },
  { date: "2024-04-02", Recieved: 97,  Rejected: 180 },
  { date: "2024-04-03", Recieved: 167,  Rejected: 120 },
  { date: "2024-04-04", Recieved: 242,  Rejected: 260 },
  { date: "2024-04-05", Recieved: 373,  Rejected: 290 },
  { date: "2024-04-06", Recieved: 301,  Rejected: 340 },
  { date: "2024-04-07", Recieved: 245,  Rejected: 180 },
  { date: "2024-04-08", Recieved: 409,  Rejected: 320 },
  { date: "2024-04-09", Recieved: 59,  Rejected: 110 },
  { date: "2024-04-10", Recieved: 261,  Rejected: 190 },
  { date: "2024-04-11", Recieved: 327,  Rejected: 350 },
  { date: "2024-04-12", Recieved: 292,  Rejected: 210 },
  { date: "2024-04-13", Recieved: 342,  Rejected: 380 },
  { date: "2024-04-14", Recieved: 137,  Rejected: 220 },
  { date: "2024-04-15", Recieved: 120,  Rejected: 170 },
  { date: "2024-04-16", Recieved: 138,  Rejected: 190 },
  { date: "2024-04-17", Recieved: 446,  Rejected: 360 },
  { date: "2024-04-18", Recieved: 364,  Rejected: 410 },
  { date: "2024-04-19", Recieved: 243,  Rejected: 180 },
  { date: "2024-04-20", Recieved: 89,  Rejected: 150 },
  { date: "2024-04-21", Recieved: 137,  Rejected: 200 },
  { date: "2024-04-22", Recieved: 224,  Rejected: 170 },
  { date: "2024-04-23", Recieved: 138,  Rejected: 230 },
  { date: "2024-04-24", Recieved: 387,  Rejected: 290 },
  { date: "2024-04-25", Recieved: 215,  Rejected: 250 },
  
  

  
]

const chartConfig = {
  views: {
    label: "",
  },
  Recieved: {
    label: "All Recieved Mails",
    color: "#0096FF"
    ,
  },
  Rejected: {
    label: "Rejected Mails",
    color: "#C70039 "
,
  },
} satisfies ChartConfig

export function Dataset() {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("Recieved")

  const total = React.useMemo(
    () => ({
      Recieved: chartData.reduce((acc, curr) => acc + curr.Recieved, 0),
       Rejected: chartData.reduce((acc, curr) => acc + curr. Rejected, 0),
    }),
    []
  )

  return (
    <Card className="ml-10 mr-20 w-[80%]  sm:w-[60%]  mb-10 md:w-[60%]  mt-4 md:h-[50vh] ">
      <CardHeader className="flex flex-col items-stretch p-0 space-y-0 border-b sm:flex-row">
        <div className="flex flex-col justify-center flex-1 gap-1 px-6 py-5 sm:py-6">
          <CardTitle>University of Ruhuna Mail Admin</CardTitle>
          <CardDescription>
            Showing total mails for the last 3 months
          </CardDescription>
        </div>
        <div className="flex">
          {["Recieved", "Rejected"].map((key) => {
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
      <CardContent className="px-2 sm:p-6 ">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[200px] w-full" 
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
