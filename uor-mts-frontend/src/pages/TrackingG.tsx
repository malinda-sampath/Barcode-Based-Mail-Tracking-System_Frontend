"use client"

import { useState } from "react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";

export default function MailTypeSelector() {
  const [selectedType, setSelectedType] = useState<string | null>(null);

  return (
    <div className="flex justify-center w-full max-w-2xl p-6 mx-auto">
      <form className="flex flex-col items-center w-[800px] h-[420px] bg-slate-400 pt-[90px]">
        <div className="w-full max-w-md space-y-6">
          {/* Heading */}
          <h2 className="flex justify-center text-2xl font-semibold text-center">
            Choose Your Mail Type <span className="text-red-500">*</span>
          </h2>

          {/* Card Buttons */}
          <div className="flex flex-col items-center gap-4">
            <Card
              className={`p-4 h-12 w-[250px] cursor-pointer transition-all hover:border-primary ${
                selectedType === "regular" ? "border-2 border-primary" : ""
              }`}
              onClick={() => setSelectedType("regular")}
            >
              <p className="font-medium text-center">REGULAR MAIL</p>
            </Card>

            <Card
              className={`p-4 h-12 w-[250px] cursor-pointer transition-all hover:border-primary ${
                selectedType === "register" ? "border-2 border-primary" : ""
              }`}
              onClick={() => setSelectedType("register")}
            >
              <p className="font-medium text-center">REGISTER POST MAIL</p>
            </Card>
          </div>

          {/* Centered NEXT Button */}
          <div className="flex justify-center">
            <Button
              className="w-[150px] h-[50px] bg-[#4F46E5] hover:bg-[#4338CA]"
              disabled={!selectedType}
              onClick={() => console.log(`Selected mail type: ${selectedType}`)}
            >
              NEXT
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}