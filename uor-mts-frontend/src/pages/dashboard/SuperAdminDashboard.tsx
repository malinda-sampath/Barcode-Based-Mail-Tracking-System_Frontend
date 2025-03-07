import React from "react";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../components/ui/card";
import { Calendar, GitBranchIcon, MailsIcon, Users2Icon } from "lucide-react";
import {Dataset}  from "../../PagesComponents/dashboard/chart/SuperDataset";
import { CalendarDemo } from "../../PagesComponents/dashboard/calender/CalendarDemo";

export default function Dashboard() {
  return (
    <>
      {/* Dashboard Title */}
      <div className="px-4 ml-4 sm:ml-6 md:ml-16 sm:px-6 lg:px-8 ">

      <h1 className="text-xl sm:text-2xl font-semibold mt-2 text-[#611010]">
        Dashboard
      </h1>
      <p className="text-xs sm:text-sm text-gray-500]">Date</p>
      {/* Card Section */}
      <div className="flex justify-between gap-0 mt-3 ml-2 " >
        {/* Branches Card */}
        <Card className="w-2/4 p-4 m-1 ">
          <CardHeader>
            <CardTitle className="flex justify-start items-center gap-4 text-[#611010]">
              <GitBranchIcon className="text-[40px] text-[#611010]" />
              Branches
            </CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-[60px] text-[#F99C30] font-bold flex items-center justify-start">
              24
            </span>
          </CardContent>
        </Card>

        {/* Admins Card */}
        <Card className="w-2/4 p-4 m-1 ">
          <CardHeader>
            <CardTitle className="flex justify-start items-center gap-4 text-[#611010]">
              <Users2Icon className="text-[40px] text-[#611010]" />
              Admins
            </CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-[60px] text-[#F99C30] font-bold flex items-center justify-start">
              24
            </span>
          </CardContent>
        </Card>

        {/* Received Mails Today Card */}
        <Card className="w-2/4 p-4 m-1 xs:w-1/3 ">
          <CardHeader>
            <CardTitle className="flex justify-start items-center gap-4 text-[#611010]">
              <MailsIcon className="text-[50px] text-[#611010]" />
              Total Mails
            </CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-[60px] text-[#F99C30] font-bold flex items-center justify-start">
              24
            </span>
          </CardContent>
        </Card>

        
                  
      </div>

      {/* Chart and Report Button Section */}
      <Card className="justify-center w-full p-5 mt-3 ml-3 align-middle">
      <div className="flex flex-wrap justify-center gap-10" >
        <Dataset />

        <div className="flex flex-col justify-end ">
      
                    <CalendarDemo/>
                    <Button className="px-10 py-2 mt-4 mb-4 bg-black sm:mt-0 sm-py-5">
                      View Report
                    </Button>

                    
                  </div>
       
      </div> </Card></div>
    </>
  );
}
