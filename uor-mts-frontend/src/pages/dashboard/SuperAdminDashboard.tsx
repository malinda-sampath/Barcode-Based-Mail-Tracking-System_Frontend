import React from "react";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../components/ui/card";
import { GitBranchIcon, MailsIcon, Users2Icon } from "lucide-react";
import { SuperDataset } from "../../components/pageComponent/dashboard/chart/SuperDataset";
import { CalendarDemo } from "../../components/pageComponent/dashboard/calender/CalendarDemo";

export default function Dashboard() {
  const currentDate = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="ml-4 sm:ml-8 md:ml-16 px-4 sm:px-6 lg:px-8">
      <h1 className="text-xl sm:text-2xl font-semibold mt-2 text-[#611010]">
        Dashboard
      </h1>
      <p className="text-xs sm:text-sm text-gray-500">{currentDate}</p>

      {/* Stats Cards - Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
        <StatCard
          icon={<GitBranchIcon className="w-6 h-6 sm:w-8 sm:h-8" />}
          title="Branches"
          value="24"
        />
        <StatCard
          icon={<Users2Icon className="w-6 h-6 sm:w-8 sm:h-8" />}
          title="Admins"
          value="24"
        />
        <StatCard
          icon={<MailsIcon className="w-6 h-6 sm:w-8 sm:h-8" />}
          title="Total Mails"
          value="24"
        />
      </div>

      {/* Chart and Calendar Section */}
      <div className="mt-4">
        <Card className="w-full p-4">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Responsive Chart */}
            <div className="w-full lg:w-2/3">
              <SuperDataset />
            </div>

            {/* Responsive Calendar */}
            <div className="w-full lg:w-1/3 flex flex-col">
              <div className="w-full max-w-xs mx-auto">
                <CalendarDemo />
              </div>
              <Button className="w-full sm:w-auto px-6 py-3 mt-4 bg-black hover:bg-gray-800 transition-colors mx-auto">
                View Report
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

// Reusable Stat Card Component
function StatCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <Card className="w-full p-4 hover:shadow-md transition-shadow">
      <CardHeader className="p-2 sm:p-3">
        <CardTitle className="flex items-center gap-3 text-[#611010] text-base sm:text-lg">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-2 sm:p-3">
        <span className="text-4xl sm:text-5xl text-[#F99C30] font-bold">
          {value}
        </span>
      </CardContent>
    </Card>
  );
}
