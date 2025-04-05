"use client";
import * as React from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../ui/select";

const mailData = [
  { date: "2024-04-01", letters: 45, parcels: 12 },
  { date: "2024-04-02", letters: 38, parcels: 8 },
  { date: "2024-04-03", letters: 52, parcels: 15 },
  { date: "2024-04-04", letters: 47, parcels: 10 },
  { date: "2024-04-05", letters: 60, parcels: 18 },
  { date: "2024-04-06", letters: 28, parcels: 5 },
  { date: "2024-04-07", letters: 22, parcels: 3 },
  { date: "2024-04-08", letters: 65, parcels: 20 },
  { date: "2024-04-09", letters: 40, parcels: 9 },
  { date: "2024-04-10", letters: 55, parcels: 14 },
  { date: "2024-04-11", letters: 48, parcels: 11 },
  { date: "2024-04-12", letters: 62, parcels: 17 },
  { date: "2024-04-13", letters: 35, parcels: 7 },
  { date: "2024-04-14", letters: 30, parcels: 6 },
  { date: "2024-04-15", letters: 42, parcels: 10 },
  { date: "2024-04-16", letters: 58, parcels: 16 },
  { date: "2024-04-17", letters: 70, parcels: 22 },
  { date: "2024-04-18", letters: 45, parcels: 12 },
  { date: "2024-04-19", letters: 50, parcels: 13 },
  { date: "2024-04-20", letters: 33, parcels: 8 },
  { date: "2024-04-21", letters: 25, parcels: 4 },
  { date: "2024-04-22", letters: 55, parcels: 15 },
  { date: "2024-04-23", letters: 40, parcels: 9 },
  { date: "2024-04-24", letters: 65, parcels: 18 },
  { date: "2024-04-25", letters: 48, parcels: 11 },
  { date: "2024-04-26", letters: 52, parcels: 14 },
  { date: "2024-04-27", letters: 38, parcels: 7 },
  { date: "2024-04-28", letters: 30, parcels: 5 },
  { date: "2024-04-29", letters: 60, parcels: 19 },
  { date: "2024-04-30", letters: 42, parcels: 10 },
  { date: "2024-05-01", letters: 55, parcels: 16 },
  { date: "2024-05-02", letters: 48, parcels: 12 },
  { date: "2024-05-03", letters: 62, parcels: 18 },
  { date: "2024-05-04", letters: 35, parcels: 8 },
  { date: "2024-05-05", letters: 28, parcels: 5 },
  { date: "2024-05-06", letters: 70, parcels: 22 },
  { date: "2024-05-07", letters: 45, parcels: 11 },
  { date: "2024-05-08", letters: 50, parcels: 14 },
  { date: "2024-05-09", letters: 40, parcels: 9 },
  { date: "2024-05-10", letters: 65, parcels: 19 },
  { date: "2024-05-11", letters: 52, parcels: 15 },
  { date: "2024-05-12", letters: 38, parcels: 7 },
  { date: "2024-05-13", letters: 60, parcels: 18 },
  { date: "2024-05-14", letters: 42, parcels: 10 },
  { date: "2024-05-15", letters: 55, parcels: 16 },
  { date: "2024-05-16", letters: 48, parcels: 12 },
  { date: "2024-05-17", letters: 70, parcels: 21 },
  { date: "2024-05-18", letters: 35, parcels: 8 },
  { date: "2024-05-19", letters: 30, parcels: 5 },
  { date: "2024-05-20", letters: 62, parcels: 17 },
  { date: "2024-05-21", letters: 45, parcels: 11 },
  { date: "2024-05-22", letters: 50, parcels: 14 },
  { date: "2024-05-23", letters: 40, parcels: 9 },
  { date: "2024-05-24", letters: 65, parcels: 18 },
  { date: "2024-05-25", letters: 52, parcels: 15 },
  { date: "2024-05-26", letters: 38, parcels: 7 },
  { date: "2024-05-27", letters: 70, parcels: 22 },
  { date: "2024-05-28", letters: 45, parcels: 11 },
  { date: "2024-05-29", letters: 60, parcels: 18 },
  { date: "2024-05-30", letters: 42, parcels: 10 },
  { date: "2024-05-31", letters: 55, parcels: 16 },
  { date: "2024-06-01", letters: 48, parcels: 12 },
  { date: "2024-06-02", letters: 62, parcels: 17 },
  { date: "2024-06-03", letters: 35, parcels: 8 },
  { date: "2024-06-04", letters: 70, parcels: 21 },
  { date: "2024-06-05", letters: 45, parcels: 11 },
  { date: "2024-06-06", letters: 50, parcels: 14 },
  { date: "2024-06-07", letters: 40, parcels: 9 },
  { date: "2024-06-08", letters: 65, parcels: 18 },
  { date: "2024-06-09", letters: 52, parcels: 15 },
  { date: "2024-06-10", letters: 38, parcels: 7 },
  { date: "2024-06-11", letters: 60, parcels: 18 },
  { date: "2024-06-12", letters: 42, parcels: 10 },
  { date: "2024-06-13", letters: 55, parcels: 16 },
  { date: "2024-06-14", letters: 70, parcels: 22 },
  { date: "2024-06-15", letters: 48, parcels: 12 },
  { date: "2024-06-16", letters: 62, parcels: 17 },
  { date: "2024-06-17", letters: 35, parcels: 8 },
  { date: "2024-06-18", letters: 30, parcels: 5 },
  { date: "2024-06-19", letters: 65, parcels: 19 },
  { date: "2024-06-20", letters: 45, parcels: 11 },
  { date: "2024-06-21", letters: 50, parcels: 14 },
  { date: "2024-06-22", letters: 40, parcels: 9 },
  { date: "2024-06-23", letters: 70, parcels: 21 },
  { date: "2024-06-24", letters: 52, parcels: 15 },
  { date: "2024-06-25", letters: 38, parcels: 7 },
  { date: "2024-06-26", letters: 60, parcels: 18 },
  { date: "2024-06-27", letters: 42, parcels: 10 },
  { date: "2024-06-28", letters: 55, parcels: 16 },
  { date: "2024-06-29", letters: 48, parcels: 12 },
  { date: "2024-06-30", letters: 62, parcels: 17 },
];

export function SuperDataset() {
  const [timeRange, setTimeRange] = React.useState("90d");
  const [activeSeries, setActiveSeries] = React.useState([
    "letters",
    "parcels",
  ]);

  const filteredData = mailData.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date("2024-06-30");
    let daysToSubtract = 90;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  const handleLegendClick = (dataKey: string) => {
    setActiveSeries((prev) =>
      prev.includes(dataKey)
        ? prev.filter((key) => key !== dataKey)
        : [...prev, dataKey]
    );
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 shadow-lg rounded-lg border border-gray-200">
          <p className="font-semibold text-gray-800">
            {new Date(label).toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>
          {payload.map((entry: any) => (
            <div key={entry.dataKey} className="flex items-center mt-1">
              <div
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-gray-600">
                {entry.dataKey === "letters" ? "Letters" : "Parcels"}:{" "}
                <span className="font-semibold">{entry.value}</span>
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const CustomLegend = ({ payload }: any) => {
    return (
      <div className="flex justify-center gap-4 mt-2">
        {payload.map((entry: any) => (
          <div
            key={entry.value}
            onClick={() => handleLegendClick(entry.value)}
            className="flex items-center cursor-pointer"
            style={{ opacity: activeSeries.includes(entry.value) ? 1 : 0.3 }}
          >
            <div
              className="w-3 h-3 rounded-full mr-2"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm text-gray-600">
              {entry.value === "letters" ? "Letters" : "Parcels"}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center gap-2 py-3 sm:py-4 space-y-0">
        <div className="grid flex-1 gap-1">
          <CardTitle className="text-lg sm:text-xl">
            Incoming Mail and Parcels
          </CardTitle>
          <CardDescription className="text-xs sm:text-sm">
            Showing daily incoming mail for the last{" "}
            {timeRange === "90d"
              ? "3 months"
              : timeRange === "30d"
              ? "30 days"
              : "7 days"}
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[140px] sm:w-[160px] rounded-lg">
            <SelectValue placeholder="Select range" />
          </SelectTrigger>
          <SelectContent className="rounded-lg">
            <SelectItem value="90d">Last 3 months</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="7d">Last 7 days</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="p-2 sm:p-4">
        <div className="h-[200px] sm:h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={filteredData}
              margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
            >
              <defs>
                <linearGradient id="colorLetters" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="colorParcels" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f0f0f0"
              />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12, fill: "#666" }}
                tickMargin={10}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  if (timeRange === "7d") {
                    return date.toLocaleDateString("en-US", {
                      weekday: "short",
                      day: "numeric",
                    });
                  }
                  return date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  });
                }}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "#666" }}
                tickMargin={10}
                width={40}
              />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{
                  stroke: "#ddd",
                  strokeWidth: 1,
                  strokeDasharray: "3 3",
                }}
              />
              {activeSeries.includes("letters") && (
                <Area
                  type="monotone"
                  dataKey="letters"
                  stroke="#8884d8"
                  fillOpacity={1}
                  fill="url(#colorLetters)"
                  strokeWidth={2}
                  activeDot={{ r: 6 }}
                />
              )}
              {activeSeries.includes("parcels") && (
                <Area
                  type="monotone"
                  dataKey="parcels"
                  stroke="#82ca9d"
                  fillOpacity={1}
                  fill="url(#colorParcels)"
                  strokeWidth={2}
                  activeDot={{ r: 6 }}
                />
              )}
              <Legend
                content={<CustomLegend />}
                wrapperStyle={{ paddingTop: "20px" }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
