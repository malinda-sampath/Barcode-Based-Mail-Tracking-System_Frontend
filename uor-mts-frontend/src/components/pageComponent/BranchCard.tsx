import React from "react";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "../ui/card";
  
  type BranchCardProps = {
    code: string;
    name: string;
    count: number;
    onClick?: () => void;
  };
  
  export const BranchCard = ({ code, name, count, onClick }: BranchCardProps) => {
    return (
      <div className="w-300px h-300px">
        <button
          onClick={onClick}
          className="transition-transform duration-200 hover:scale-105 focus:outline-none w-full h-full"
        >
          <Card className="w-60 h-60">
            <CardHeader>
              <CardTitle className="text-[#611010] font-bold text-xl text-left text-[30px]">
                {code}
              </CardTitle>
            </CardHeader>
            <CardContent className="h-16 overflow-hidden text-[#611010]">
              <p className="line-clamp-2 text-left text-[18px]">{name}</p>
            </CardContent>
            <CardFooter>
              <p className="text-[60px] text-[#F99C30] font-bold">
                {count}
              </p>
            </CardFooter>
          </Card>
        </button>
      </div>
    );
  };