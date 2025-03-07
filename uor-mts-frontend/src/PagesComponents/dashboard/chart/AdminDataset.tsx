"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../../../components/ui/chart"
const chartData = [
  { month: "January", recieved: 186, reject: 80 },
  { month: "February", recieved: 305, reject: 200 },
  { month: "March", recieved: 237, reject: 120 },
  { month: "April", recieved: 73, reject: 190 },
  { month: "May", recieved: 209, reject: 130 },
  { month: "June", recieved: 214, reject: 140 },
]

const chartConfig = {
  recieved: {
    label: "recieved",
    color: "hsl(var(--chart-1))",
  },
  reject: {
    label: "reject",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function AdminDataset() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bar Chart - Mails</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="recieved" fill="var(--color-recieved)" radius={4} />
            <Bar dataKey="reject" fill="var(--color-reject)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
         ALL RECIEVED AND REJECTED MAILS
        </div>
      </CardFooter>
    </Card>
  )
}
