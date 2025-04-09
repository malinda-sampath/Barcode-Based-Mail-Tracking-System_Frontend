"use client";
import * as React from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Cell,
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

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

interface SuperDatasetProps {
  branchData: Array<{
    branch: string;
    [key: string]: number | string;
  }>;
  statusData: Array<{
    name: string;
    value: number;
  }>;
  mailTypes: string[];
  timeRange?: string;
}

export function SuperDataset({
  branchData,
  statusData,
  mailTypes,
  timeRange = "30d",
}: SuperDatasetProps) {
  const [activeTab, setActiveTab] = React.useState("status");

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 shadow-lg rounded-lg border border-gray-200">
          <p className="font-semibold text-gray-800">{label}</p>
          {payload.map((entry: any) => (
            <div key={entry.dataKey} className="flex items-center mt-1">
              <div
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-gray-600">
                {entry.name}:{" "}
                <span className="font-semibold">{entry.value}</span>
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    switch (activeTab) {
      case "branch":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={branchData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="branch" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              {mailTypes.map((type, index) => (
                <Bar
                  key={type}
                  dataKey={type}
                  name={type.charAt(0).toUpperCase() + type.slice(1)}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        );
      case "status":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
              >
                {statusData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`Count: ${value}`, ""]} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        );
      case "trend":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={branchData}>
              <defs>
                {mailTypes.map((type, index) => (
                  <linearGradient
                    key={type}
                    id={`color-${type}`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor={COLORS[index % COLORS.length]}
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor={COLORS[index % COLORS.length]}
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="branch" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              {mailTypes.map((type, index) => (
                <Area
                  key={type}
                  type="monotone"
                  dataKey={type}
                  stroke={COLORS[index % COLORS.length]}
                  fillOpacity={1}
                  fill={`url(#color-${type})`}
                  name={type.charAt(0).toUpperCase() + type.slice(1)}
                  activeDot={{ r: 6 }}
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center gap-2 py-3 sm:py-4 space-y-0">
        <div className="grid flex-1 gap-1">
          <CardTitle className="text-lg sm:text-xl">
            Mail Analytics Overview
          </CardTitle>
          <CardDescription className="text-xs sm:text-sm">
            {activeTab === "branch" && "Mail distribution across branches"}
            {activeTab === "status" && "Status distribution of all mails"}
            {activeTab === "trend" && "Mail trends over time"}
          </CardDescription>
        </div>
        <div className="flex gap-2">
          <Select value={activeTab} onValueChange={setActiveTab}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="View" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="status">By Status</SelectItem>
              <SelectItem value="branch">By Branch</SelectItem>
              <SelectItem value="trend">Trends</SelectItem>
            </SelectContent>
          </Select>
          {activeTab === "trend" && (
            <Select value={timeRange} onValueChange={() => {}}>
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">7 Days</SelectItem>
                <SelectItem value="30d">30 Days</SelectItem>
                <SelectItem value="90d">90 Days</SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-2 sm:p-4">
        <div className="h-[300px] w-full">{renderChart()}</div>
        {activeTab === "branch" && (
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-200 text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Branch
                  </th>
                  {mailTypes.map((type) => (
                    <th
                      key={type}
                      className="border border-gray-300 px-4 py-2 text-left"
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {branchData.map((data, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="border border-gray-300 px-4 py-2">
                      {data.branch}
                    </td>
                    {mailTypes.map((type) => (
                      <td
                        key={type}
                        className="border border-gray-300 px-4 py-2 text-center"
                      >
                        {data[type] || 0}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
