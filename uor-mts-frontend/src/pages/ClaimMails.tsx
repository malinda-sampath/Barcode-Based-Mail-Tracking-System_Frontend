import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";

// Define the type for a branch
type Branch = {
  code: string;
  name: string;
  count: number;
};

// Sample data for branches
const branches: Branch[] = [
  { code: "B102", name: "Faculty Of Science", count: 24 },
  { code: "B103", name: "Faculty Of Art", count: 18 },
  { code: "B104", name: "Faculty Of Management", count: 32 },
  { code: "B104", name: "Faculty Of Management", count: 32 },
  { code: "B104", name: "Faculty Of Management", count: 32 },
  { code: "B104", name: "Faculty Of Management", count: 32 },
  { code: "B104", name: "Faculty Of Management", count: 32 },
  { code: "B104", name: "Faculty Of Management", count: 32 },
  { code: "B104", name: "Faculty Of Management", count: 32 },
  { code: "B103", name: "Faculty Of Art", count: 18 },
  // Add more branches as needed
];

export const ClaimMails = () => {
  const [filter, setFilter] = useState<string>("");

  const [filteredBranches, setFilteredBranches] = useState<Branch[]>(branches);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const filtered = branches.filter(
        (branch) =>
          branch.code.toLowerCase().includes(filter.toLowerCase()) ||
          branch.name.toLowerCase().includes(filter.toLowerCase())
      );
      setFilteredBranches(filtered);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [filter]);

  return (
    <>
      <div className="px-4 ml-4 sm:ml-6 md:ml-16 sm:px-6 lg:px-8 ">
        <h1 className="text-xl sm:text-2xl font-semibold mb-3 text-[#611010]">
          Claim Mails
        </h1>
        <Input
          placeholder="Filter Branch..."
          className="max-w-sm mb-4"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap gap-10 ml-20 sm:gap-5">
        {filteredBranches.map((branch) => (
          <button
            key={branch.code}
            className="transition-transform duration-200 hover:scale-105"
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-[#611010] font-bold text-xl text-left">
                  {branch.code}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>{branch.name}</p>
              </CardContent>
              <CardFooter>
                <p className="text-[60px] text-[#F99C30] font-bold">
                  {branch.count}
                </p>
              </CardFooter>
            </Card>
          </button>
        ))}
      </div>
    </>
  );
};
