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
  { date: "2024-04-01",  claimed: 222,  rejected: 150 },
  { date: "2024-04-02",  claimed: 97,  rejected: 180 },
  { date: "2024-04-03",  claimed: 167,  rejected: 120 },
  { date: "2024-04-04",  claimed: 242,  rejected: 260 },
  { date: "2024-04-05",  claimed: 373,  rejected: 290 },
  { date: "2024-04-06",  claimed: 301,  rejected: 340 },
  { date: "2024-04-07",  claimed: 245,  rejected: 180 },
  { date: "2024-04-08",  claimed: 409,  rejected: 320 },
  { date: "2024-04-09",  claimed: 59,  rejected: 110 },
  { date: "2024-04-10",  claimed: 261,  rejected: 190 },
  { date: "2024-04-11",  claimed: 327,  rejected: 350 },
  { date: "2024-04-12",  claimed: 292,  rejected: 210 },
  { date: "2024-04-13",  claimed: 342,  rejected: 380 },
  { date: "2024-04-14",  claimed: 137,  rejected: 220 },
  { date: "2024-04-15",  claimed: 120,  rejected: 170 },
  { date: "2024-04-16",  claimed: 138,  rejected: 190 },
  { date: "2024-04-17",  claimed: 446,  rejected: 360 },
  { date: "2024-04-18",  claimed: 364,  rejected: 410 },
  { date: "2024-04-19",  claimed: 243,  rejected: 180 },
  { date: "2024-04-20",  claimed: 89,  rejected: 150 },
  { date: "2024-04-21",  claimed: 137,  rejected: 200 },
  { date: "2024-04-22",  claimed: 224,  rejected: 170 },
  { date: "2024-04-23",  claimed: 138,  rejected: 230 },
  { date: "2024-04-24",  claimed: 387,  rejected: 290 },
  { date: "2024-04-25",  claimed: 215,  rejected: 250 },
  { date: "2024-04-26",  claimed: 75,  rejected: 130 },
  { date: "2024-04-27",  claimed: 383,  rejected: 420 },
  { date: "2024-04-28",  claimed: 122,  rejected: 180 },
  { date: "2024-04-29",  claimed: 315,  rejected: 240 },
  { date: "2024-04-30",  claimed: 454,  rejected: 380 },
  { date: "2024-05-01",  claimed: 165,  rejected: 220 },
  { date: "2024-05-02",  claimed: 293,  rejected: 310 },
  { date: "2024-05-03",  claimed: 247,  rejected: 190 },
  { date: "2024-05-04",  claimed: 385,  rejected: 420 },
  { date: "2024-05-05",  claimed: 481,  rejected: 390 },
  { date: "2024-05-06",  claimed: 498,  rejected: 520 },
  { date: "2024-05-07",  claimed: 388,  rejected: 300 },
  { date: "2024-05-08",  claimed: 149,  rejected: 210 },
  { date: "2024-05-09",  claimed: 227,  rejected: 180 },
  { date: "2024-05-10",  claimed: 293,  rejected: 330 },
  { date: "2024-05-11",  claimed: 335,  rejected: 270 },
  { date: "2024-05-12",  claimed: 197,  rejected: 240 },
  { date: "2024-05-13",  claimed: 197,  rejected: 160 },
  { date: "2024-05-14",  claimed: 448,  rejected: 490 },
  { date: "2024-05-15",  claimed: 473,  rejected: 380 },
  { date: "2024-05-16",  claimed: 338,  rejected: 400 },
  { date: "2024-05-17",  claimed: 499,  rejected: 420 },
  { date: "2024-05-18",  claimed: 315,  rejected: 350 },
  { date: "2024-05-19",  claimed: 235,  rejected: 180 },
  { date: "2024-05-20",  claimed: 177,  rejected: 230 },
  { date: "2024-05-21",  claimed: 82,  rejected: 140 },
  { date: "2024-05-22",  claimed: 81,  rejected: 120 },
  { date: "2024-05-23",  claimed: 252,  rejected: 290 },
  { date: "2024-05-24",  claimed: 294,  rejected: 220 },
  { date: "2024-05-25",  claimed: 201,  rejected: 250 },
  { date: "2024-05-26",  claimed: 213,  rejected: 170 },
  { date: "2024-05-27",  claimed: 420,  rejected: 460 },
  { date: "2024-05-28",  claimed: 233,  rejected: 190 },
  { date: "2024-05-29",  claimed: 78,  rejected: 130 },
  { date: "2024-05-30",  claimed: 340,  rejected: 280 },
  { date: "2024-05-31",  claimed: 178,  rejected: 230 },
  { date: "2024-06-01",  claimed: 178,  rejected: 200 },
  { date: "2024-06-02",  claimed: 470,  rejected: 410 },
  { date: "2024-06-03",  claimed: 103,  rejected: 160 },
  { date: "2024-06-04",  claimed: 439,  rejected: 380 },
  { date: "2024-06-05",  claimed: 88,  rejected: 140 },
  { date: "2024-06-06",  claimed: 294,  rejected: 250 },
  { date: "2024-06-07",  claimed: 323,  rejected: 370 },
  { date: "2024-06-08",  claimed: 385,  rejected: 320 },
  { date: "2024-06-09",  claimed: 438,  rejected: 480 },
  { date: "2024-06-10",  claimed: 155,  rejected: 200 },
  { date: "2024-06-11",  claimed: 92,  rejected: 150 },
  { date: "2024-06-12",  claimed: 492,  rejected: 420 },
  { date: "2024-06-13",  claimed: 81,  rejected: 130 },
  { date: "2024-06-14",  claimed: 426,  rejected: 380 },
  { date: "2024-06-15",  claimed: 307,  rejected: 350 },
  { date: "2024-06-16",  claimed: 371,  rejected: 310 },
  { date: "2024-06-17",  claimed: 475,  rejected: 520 },
  { date: "2024-06-18",  claimed: 107,  rejected: 170 },
  { date: "2024-06-19",  claimed: 341,  rejected: 290 },
  { date: "2024-06-20",  claimed: 408,  rejected: 450 },
  { date: "2024-06-21",  claimed: 169,  rejected: 210 },
  { date: "2024-06-22",  claimed: 317,  rejected: 270 },
  { date: "2024-06-23",  claimed: 480,  rejected: 530 },
  { date: "2024-06-24",  claimed: 132,  rejected: 180 },
  { date: "2024-06-25",  claimed: 141,  rejected: 190 },
  { date: "2024-06-26",  claimed: 434,  rejected: 380 },
  { date: "2024-06-27",  claimed: 448,  rejected: 490 },
  { date: "2024-06-28",  claimed: 149,  rejected: 200 },
  { date: "2024-06-29",  claimed: 103,  rejected: 160 },
  { date: "2024-06-30",  claimed: 446,  rejected: 400 },
]

const chartConfig = {
  views: {
    label: "Page Views",
  },
   claimed: {
    label: "Claimed",
    color: "hsl(var(--chart-2))",
  },
   rejected: {
    label: "rejected",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function BranchDataset() {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("claimed")

  const total = React.useMemo(
    () => ({
       claimed: chartData.reduce((acc, curr) => acc + curr. claimed, 0),
       rejected: chartData.reduce((acc, curr) => acc + curr. rejected, 0),
    }),
    []
  )

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch p-0 space-y-0 border-b sm:flex-row">
        <div className="flex flex-col justify-center flex-1 gap-1 px-6 py-5 sm:py-6">
          <CardTitle>UOR Genaral Admin</CardTitle>
          <CardDescription>
claimed Mails and Rejected Mails          </CardDescription>
        </div>
        <div className="flex">
          {["claimed", "rejected"].map((key) => {
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
