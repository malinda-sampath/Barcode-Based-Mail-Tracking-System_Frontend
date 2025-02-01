import React from "react";
import {Button} from '../../components/ui/button'
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "../../components/ui/card";
import { GitBranch, GitBranchIcon, MailsIcon, User2Icon, Users2Icon } from "lucide-react";
import { FaCodeBranch, FaUser, FaUsers } from "react-icons/fa";
import { HiUsers } from "react-icons/hi";
import {Dataset} from '../dashboard/Chart/Dataset'



export default function Dashboard() {
  return (
    <>

    <div className="ml-[48px] mb-5 text-[#611010] font-bold text-[20px]">DASHBOARD</div>
    <div className="ml-10 sm:flex sm:flex-row md:flex md:flex-row lg:flex lg:flex-row ">
      <Card className=" pr-[100px] m-2   sm:pr-6 md:pr-20 lg:pr-20">
        <CardHeader>
          <CardTitle className="flex justify-start items-center gap-[6px] sm:gap-10 text-[#611010]"><GitBranchIcon className="text-[40px] text-[#611010]" /><span className="text-[30px]">BRANCHES</span></CardTitle>
         </CardHeader>
        <CardContent >
         <span className="text-[60px] text-[#F99C30] font-bold">24</span>
        </CardContent>
        <CardFooter>
          
        </CardFooter>
      </Card>


      <Card className="  m-2   pr-[100px]  sm:pr-6 md:pr-20 lg:pr-20">
        <CardHeader>
        <CardTitle className="flex justify-start items-center gap-[6px] sm:gap-10 text-[#611010]"><Users2Icon className="text-[40px] text-[#611010]" /><span className="text-[30px]">Admins</span></CardTitle>

        </CardHeader>
        <CardContent >
         <span className="text-[60px] text-[#F99C30] font-bold">24</span>
        </CardContent>
        <CardFooter>
          
        </CardFooter>
      </Card>

      <Card className=" pr-[90px] m-2    sm:pr-6 md:pr-20 lg:pr-20">
        <CardHeader>
        <CardTitle className="flex justify-start items-center gap-[6px] sm:gap-10 text-[#611010]"><MailsIcon className="text-[50px] sm:text-[50px] md:text-[50px]   text-[#611010]" /><span className="text-[25px]">RECIEVED MAILS TODAY</span></CardTitle>
        </CardHeader>
        <CardContent >
         <span className="text-[60px] text-[#F99C30] font-bold">24</span>
        </CardContent>
        <CardFooter>
          
        </CardFooter>
      </Card>
    </div>
    <div className="flex flex-row justify-start">
  <Dataset />
  <Button className="bg-black mt-[300px] pl-10 pr-10">Report</Button>
</div>



  
    
    
    </>
    
  );
}
