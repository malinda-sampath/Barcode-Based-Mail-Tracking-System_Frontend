import React from "react";
import { Button } from "../../components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/card";
import { Calendar, GitBranchIcon, MailMinusIcon, MailsIcon, Users2Icon } from "lucide-react";
import { AdminDataset } from "../../PagesComponents/dashboard/chart/AdminDataset";
import { CalendarDemo } from "../../PagesComponents/dashboard/calender/CalendarDemo";
import { FaRegCreditCard, FaRegObjectGroup } from "react-icons/fa";

export default function AdminDashboard() {
  return (
    <>
      {/* Dashboard Title */}
     
      {/* Card Section */}
      <div className="flex flex-wrap gap-10 ml-8 sm:gap-5">
        {/* Branches Card */}
        <Card className="w-full p-4 m-1 sm:w-1/4">
          <CardHeader>
            <CardTitle className="flex justify-start items-center gap-4 text-[#611010]">
              <MailsIcon className="text-[40px] text-[#611010]" />
             Entered Mails
            </CardTitle>
          </CardHeader>
          <CardContent className="text-[60px] text-[#F99C30] font-bold">
           <p>24</p>
          </CardContent>
        </Card>


        {/* Rejected mail Card */}
        <Card className="w-full p-4 m-1 sm:w-1/4">
          <CardHeader>
            <CardTitle className="flex justify-start items-center gap-4 text-[#611010]">
              <MailMinusIcon className="text-[40px] text-[#611010]" />
              REJECT MAILS
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-[60px] text-[#F99C30] font-bold">20</p>
          </CardContent>
        </Card>

      
        
      </div>

      {/* Chart and Report Button Section */}
      <div className="flex flex-wrap gap-4 mt-4 ml-7">
        <AdminDataset />

        {/* Calendar */}
        <div className="">
          <CalendarDemo />
          <div className="flex flex-col gap-5 mt-7">
          <Button className="px-10 py-2 bg-black sm:mt-0 sm-py-5">View Report</Button>
        
           
          
          </div>
    
        </div>

        {/* Buttons */}
        
      </div>
    </>
  );
}
