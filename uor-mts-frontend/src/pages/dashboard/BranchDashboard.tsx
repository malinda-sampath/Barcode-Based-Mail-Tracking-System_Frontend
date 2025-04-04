import React from "react";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../components/ui/card";
import {
  Calendar,
  GitBranchIcon,
  MailCheck,
  MailMinus,
  MailsIcon,
  Users2Icon,
} from "lucide-react";
import { SuperDataset } from "../../components/pageComponent/dashboard/chart/SuperDataset";
import { CalendarDemo } from "../../components/pageComponent/dashboard/calender/CalendarDemo";

export default function Dashboard() {
  return (
    <div>
      {/* Dashboard Title */}
      <div className="px-4 ml-4 sm:ml-6 md:ml-16 sm:px-6 lg:px-8 ">
        <h1 className="text-xl sm:text-2xl font-semibold mt-2 text-[#611010]">
          Dashboard
        </h1>
        <p className="text-xs sm:text-sm text-gray-500]">Date</p>
        {/* Card Section */}
        <div className="flex justify-between gap-0 mt-3 ml-2 ">
          <Card className="w-full p-4 m-1 ">
            <CardHeader>
              <CardTitle className="flex justify-start items-center gap-4 text-[#611010]">
                <MailCheck className="text-[40px] text-[#611010]" />
                CLAIM Mails
              </CardTitle>
            </CardHeader>
            <CardContent>
              <span className="text-[60px] text-[#F99C30] font-bold">24</span>
            </CardContent>
          </Card>

          {/* Rejected mail Card */}
          <Card className="w-full p-4 m-1">
            <CardHeader>
              <CardTitle className="flex justify-start items-center gap-4 text-[#611010]">
                <MailMinus className="text-[40px] text-[#611010]" />
                REJECT MAILS
              </CardTitle>
            </CardHeader>
            <CardContent>
              <span className="text-[60px] text-[#F99C30] font-bold">20</span>
            </CardContent>
          </Card>
        </div>

        {/* Chart and Report Button Section */}
        <Card className="justify-center w-full p-5 mt-3 ml-3 align-middle">
          <div className="flex flex-wrap justify-center gap-10">
            <SuperDataset />

            <div className="flex flex-col justify-end ">
              <CalendarDemo />
              <Button className="px-10 py-2 mt-4 mb-4 bg-black sm:mt-0 sm-py-5">
                View Report
              </Button>
            </div>
          </div>{" "}
        </Card>
      </div>
    </div>
  );
}
