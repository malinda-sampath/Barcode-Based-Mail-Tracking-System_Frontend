import React from "react";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../components/ui/card";
import { Calendar, GitBranchIcon, MailsIcon, Users2Icon } from "lucide-react";
import { Dataset } from "../../PagesComponents/dashboard/chart/SuperDataset";
import { CalendarDemo } from "../../PagesComponents/dashboard/calender/CalendarDemo";

export default function Dashboard() {
  return (
    <>
      {/* Dashboard Title */}

      {/* Card Section */}
      <div className="flex flex-wrap justify-center gap-10 ml-8 sm:gap-5 mt-5">
        {/* Branches Card */}
        <Card className="w-full p-4 m-1 sm:w-1/4">
          <CardHeader>
            <CardTitle className="flex justify-start items-center gap-4 text-[#611010]">
              <GitBranchIcon className="text-[40px] text-[#611010]" />
              Branches
            </CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-[60px] text-[#F99C30] font-bold flex items-center justify-center">
              24
            </span>
          </CardContent>
        </Card>

        {/* Admins Card */}
        <Card className="w-full p-4 m-1 sm:w-1/4">
          <CardHeader>
            <CardTitle className="flex justify-start items-center gap-4 text-[#611010]">
              <Users2Icon className="text-[40px] text-[#611010]" />
              Admins
            </CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-[60px] text-[#F99C30] font-bold flex items-center justify-center">
              24
            </span>
          </CardContent>
        </Card>

        {/* Received Mails Today Card */}
        <Card className="w-full p-4 m-1 sm:w-1/4">
          <CardHeader>
            <CardTitle className="flex justify-start items-center gap-4 text-[#611010]">
              <MailsIcon className="text-[50px] text-[#611010]" />
              Total Mails
            </CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-[60px] text-[#F99C30] font-bold flex items-center justify-center">
              24
            </span>
          </CardContent>
        </Card>
      </div>

      {/* Chart and Report Button Section */}
      <div className="flex flex-wrap justify-center gap-4 mt-4 ml-7">
        <Dataset />

        {/* Calendar */}
        <div className="flex flex-col gap-5 mt-5">
          <CalendarDemo />
          <div className="flex flex-col gap-5 ">
            <Button className="px-10 py-2 bg-black sm:mt-0 sm-py-5">
              View Report
            </Button>
          </div>
        </div>

        {/* Buttons */}
      </div>
    </>
  );
}
