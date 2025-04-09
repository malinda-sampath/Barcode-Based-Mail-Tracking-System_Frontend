"use client";
import React, { useState, useEffect, useMemo } from "react";
import { Button } from "../../components/ui/button";
import {
  fetchBranchMails,
  fetchPendingBranchMails,
} from "../../services/branchManager/PendindMailService";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../components/ui/card";
import {
  GitBranchIcon,
  MailsIcon,
  Users2Icon,
  FilterIcon,
  DownloadIcon,
} from "lucide-react";
import { SuperDataset } from "../../components/pageComponent/dashboard/chart/SuperDataset";
import { CalendarDemo } from "../../components/pageComponent/dashboard/calender/CalendarDemo";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { toast } from "sonner";

interface MainMailCart {
  index?: number;
  senderName: string;
  receiverName: string;
  mailType: string;
  trackingNumber: string;
  barcodeId: string;
  BranchName: string;
  barcodeImage: string;
  location: string;
  status: "pending" | "claimed" | "picked";
  insertDateTime: string;
  updateDateTime: string;
  referenceNumber: string;
}

export default function Dashboard() {
  const [mails, setMails] = useState<MainMailCart[]>([]);
  const [filteredMails, setFilteredMails] = useState<MainMailCart[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedMailType, setSelectedMailType] = useState<string>("all");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [claimMails, setClaimMails] = useState<MainMailCart[]>([]);
  const [pendingMailsList, setPendingMailsList] = useState<MainMailCart[]>([]);

  const fetchBranchMailDetails = async () => {
    setIsLoading(true);
    try {
      const response = await fetchBranchMails();
      if (response.data && Array.isArray(response.data.data)) {
        const mailsWithIndex = (
          response.data.data as unknown as MainMailCart[]
        ).map((mail, index) => ({
          ...mail,
          index: index + 1,
        }));
        setMails(mailsWithIndex);
        setFilteredMails(mailsWithIndex);
      }
    } catch (err) {
      console.error("Error fetching mails:", err);
      toast.error("Failed to fetch mails");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPendingMails = async () => {
    setIsLoading(true);
    try {
      const response = await fetchPendingBranchMails();
      if (response.data && Array.isArray(response.data.data)) {
        const pendingMailsData = (response.data.data as MainMailCart[]).filter(
          (mail) => mail.status === "pending" // Only include mails with status "pending"
        );
        setPendingMailsList(pendingMailsData);
      }
    } catch (err) {
      console.error("Error fetching pending mails:", err);
      toast.error("Failed to fetch pending mails");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBranchMailDetails();
    fetchPendingMails();
  }, []);

  const mailTypes = useMemo(() => {
    const types = new Set<string>();
    mails.forEach((mail) => types.add(mail.mailType.toLowerCase()));
    return ["all", ...Array.from(types)];
  }, [mails]);

  const statusOptions = ["all", "pending", "claimed", "picked"];

  useEffect(() => {
    let result = [...mails];

    if (selectedStatus !== "all") {
      result = result.filter((mail) => mail.status === selectedStatus);
    }

    if (selectedMailType !== "all") {
      result = result.filter(
        (mail) => mail.mailType.toLowerCase() === selectedMailType.toLowerCase()
      );
    }

    setFilteredMails(result);
  }, [selectedStatus, selectedMailType, mails]);

  const currentDate = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  // Calculate statistics
  const totalMails = mails.length;

  const pendingMails = pendingMailsList.length;
  const claimedMails = mails.filter((mail) => mail.status === "claimed").length;
  const pickedMails = mails.filter((mail) => mail.status === "picked").length;

  const prepareStatusData = () => {
    return [
      { name: "Pending", value: pendingMails },
      { name: "Claimed", value: claimedMails },
      { name: "Picked", value: pickedMails },
    ];
  };

  function addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  return (
    <div className="ml-4 sm:ml-8 md:ml-16 px-4 sm:px-6 lg:px-8">
      <h1 className="text-lg sm:text-xl md:text-2xl font-semibold mt-2 text-[#611010]">
        Mail Management Dashboard
      </h1>
      <p className="text-xs sm:text-sm text-gray-500">{currentDate}</p>

      {/* Stats Cards */}
      <div className="flex flex-col sm:flex-row gap-4 mt-4">
        <StatCard
          icon={<Users2Icon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8" />}
          title="Total Mails"
          value={totalMails.toString()}
          description="All mail items"
        />
        <StatCard
          icon={<MailsIcon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8" />}
          title="Pending"
          value={pendingMails.toString()}
          description="Awaiting processing"
          variant="pending"
        />
        <StatCard
          icon={<MailsIcon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8" />}
          title="Picked"
          value={pickedMails.toString()}
          description="Successfully collected"
          variant="picked"
        />
        <StatCard
          icon={
            <GitBranchIcon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8" />
          }
          title="Claimed"
          value={claimedMails.toString()}
          description="Claimed by users"
          variant="default"
        />
      </div>

      {/* Filters */}
      <div className="mt-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="flex items-center gap-2">
          <FilterIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
          <span className="text-sm font-medium">Filters:</span>
        </div>

        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            {statusOptions.map((status) => (
              <SelectItem key={status} value={status}>
                {status === "all"
                  ? "All Statuses"
                  : status.charAt(0).toUpperCase() + status.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedMailType} onValueChange={setSelectedMailType}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Select mail type" />
          </SelectTrigger>
          <SelectContent>
            {mailTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type === "all"
                  ? "All Types"
                  : type.charAt(0).toUpperCase() + type.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button variant="outline" className="ml-auto w-full sm:w-auto">
          <DownloadIcon className="w-4 h-4 mr-2" />
          Export Data
        </Button>
      </div>

      {/* Chart and Calendar Section */}
      <div className="mt-4">
        <Card className="w-full p-4">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="w-full lg:w-2/3">
              <SuperDataset
                branchData={[]}
                statusData={prepareStatusData()}
                mailTypes={mailTypes.filter((t) => t !== "all")}
                timeRange="30d"
              />
            </div>

            <div className="w-full lg:w-1/3 flex flex-col">
              <div className="w-full max-w-xs mx-auto">
                <CalendarDemo
                  mailEvents={[
                    {
                      date: new Date(),
                      title: "Parcel - pending",
                      status: "pending",
                    },
                  ]}
                />
              </div>
              <div className="flex flex-col gap-2 mt-4">
                <Button className="w-full bg-black hover:bg-gray-800 transition-colors">
                  Generate Report
                </Button>
                <Button variant="outline" className="w-full">
                  View All Mails
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Stats */}
      {/* <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <QuickStatCard
          title="Claimed"
          value={claimedMails}
          percentage={
            totalMails > 0 ? Math.round((claimedMails / totalMails) * 100) : 0
          }
          trend="up"
        />
        {mailTypes
          .filter((t) => t !== "all")
          .map((type) => {
            const count = mails.filter(
              (m) => m.mailType.toLowerCase() === type
            ).length;
            return (
              <QuickStatCard
                key={type}
                title={type.charAt(0).toUpperCase() + type.slice(1)}
                value={count}
                percentage={
                  totalMails > 0 ? Math.round((count / totalMails) * 100) : 0
                }
                trend="up"
              />
            );
          })}
      </div> */}
    </div>
  );
}

function StatCard({
  icon,
  title,
  value,
  description,
  variant = "default",
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  description?: string;
  variant?: "default" | "pending" | "picked";
}) {
  const variantStyles = {
    default: "bg-white",
    pending: "bg-orange-50 border-orange-100",
    picked: "bg-green-50 border-green-100",
  };

  return (
    <Card
      className={`w-full p-4 hover:shadow-md transition-shadow ${variantStyles[variant]} flex flex-col`}
    >
      <CardHeader className="p-2 sm:p-3">
        <CardTitle className="flex items-center gap-3 text-[#611010] text-base sm:text-lg">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-2 sm:p-3">
        <span className="text-3xl sm:text-4xl lg:text-5xl text-[#F99C30] font-bold">
          {value}
        </span>
        {description && (
          <p className="text-xs sm:text-sm text-gray-500 mt-2">{description}</p>
        )}
      </CardContent>
    </Card>
  );
}

function QuickStatCard({
  title,
  value,
  percentage,
  trend,
}: {
  title: string;
  value: number;
  percentage: number;
  trend: "up" | "down";
}) {
  return (
    <Card className="w-full p-4 hover:shadow-md transition-shadow flex flex-col">
      <CardHeader className="p-2">
        <CardTitle className="text-sm font-medium text-gray-600">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-2">
        <div className="flex items-end justify-between">
          <span className="text-xl sm:text-2xl font-bold">{value}</span>
          <span
            className={`text-sm flex items-center ${
              trend === "up" ? "text-green-500" : "text-red-500"
            }`}
          >
            {trend === "up" ? "↑" : "↓"} {percentage}%
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
