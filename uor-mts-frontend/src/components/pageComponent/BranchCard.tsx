import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Mail, MapPin, ChevronRight } from "lucide-react";

type BranchCardProps = {
  code: string;
  name: string;
  count: number;
  description: string;
  address?: string;
  onClick?: () => void;
};

export const BranchCard = ({
  code,
  name,
  count,
  onClick,
  description,
  address,
}: BranchCardProps) => {
  return (
    <div className="w-full sm:w-[300px] h-full p-2">
      <button
        onClick={onClick}
        className="transition-all duration-300 hover:scale-[1.02] focus:outline-none w-full h-full
                   focus:ring-2 focus:ring-[#611010] focus:ring-opacity-50 rounded-lg
                   group" // Added group for child element animations
        aria-label={`View mail details for ${name} branch`}
      >
        <Card
          className="w-full h-full flex flex-col justify-between
                        border-2 border-[#611010]/20 hover:border-[#F99C30]
                        shadow-sm hover:shadow-lg bg-gradient-to-br from-white to-[#fff9f5]
                        relative overflow-hidden"
        >
          {/* Mail icon decoration */}
          <Mail className="absolute -right-4 -top-4 text-[#611010]/10 w-24 h-24" />

          <div className="z-10">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-[#611010] font-bold text-xl sm:text-2xl text-left">
                  {code}
                </CardTitle>
                <span className="bg-[#611010] text-white text-xs px-4 py-1 rounded-full">
                  Mail Cart
                </span>
              </div>
            </CardHeader>

            <CardContent className="pb-2 space-y-2">
              <h3 className="text-[#611010] font-semibold text-lg sm:text-xl text-left line-clamp-1">
                {name}
              </h3>

              {address && (
                <div className="flex items-start gap-1 text-[#611010]/80">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <p className="text-sm line-clamp-2 text-left">{address}</p>
                </div>
              )}

              <p className="text-[#611010] text-left text-sm sm:text-base line-clamp-3">
                {description}
              </p>
            </CardContent>
          </div>

          <CardFooter className="flex justify-between items-end border-t border-[#611010]/10 pt-3">
            <div>
              <span className="text-xs sm:text-sm text-[#611010] opacity-80 block">
                Pending Mails
              </span>
              <p className="text-3xl sm:text-4xl text-[#F99C30] font-bold">
                {count}
              </p>
            </div>

            <div className="flex items-center gap-1 text-[#611010] group-hover:text-[#F99C30] transition-colors">
              <span className="text-sm font-medium hidden sm:inline">View</span>
              <ChevronRight className="w-5 h-5" />
            </div>
          </CardFooter>
        </Card>
      </button>
    </div>
  );
};
