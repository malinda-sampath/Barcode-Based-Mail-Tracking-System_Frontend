import { useState, useMemo } from 'react';
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { BranchCard } from '../components/pageComponent/BranchCard';

type BranchInfo = {
  code: string;
  name: string;
};

type MailCount = {
  branchCode: string;
  count: number;
};

type Branch = {
  code: string;
  name: string;
  count: number;
};

type ClaimMailsProps = {
  branchesData?: BranchInfo[];    
  mailCountsData?: MailCount[];   
};

export const ClaimMails = ({ 
  branchesData = [], 
  mailCountsData = [] 
}: ClaimMailsProps) => {

  
  const [filter, setFilter] = useState('');

  const filteredBranches = useMemo(() => {
    const combined = branchesData.map(branch => ({
      ...branch,
      count: mailCountsData.find(mc => mc.branchCode === branch.code)?.count || 0
    }));

    return filter 
      ? combined.filter(
          branch => branch.code.toLowerCase().includes(filter.toLowerCase()) ||
                    branch.name.toLowerCase().includes(filter.toLowerCase())
        )
      : combined;
  }, [branchesData, mailCountsData, filter]);

  const currentDate = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="m-12">
      <h1 className="text-xl sm:text-2xl font-semibold mt-2 text-[#611010] ml-12">
        Claim Mails
      </h1>
      <p className="text-xs sm:text-sm text-gray-500 ml-12">{currentDate}</p>
      <br />
      
      <Input
        placeholder="Filter Branch..."
        className="max-w-sm mb-4 ml-12"
        value={filter}
        onChange={(e) => setFilter(e.target.value)} 
      />
      
      <div className="flex flex-wrap gap-10 ml-12 sm:gap-5">
        {filteredBranches.length > 0 ? (
          filteredBranches.map((branch) => (
            <BranchCard
              key={`${branch.code}-${branch.name}`}
              code={branch.code}
              name={branch.name}
              count={branch.count}
            />
          ))
        ) : (
          <div className="ml-12 text-gray-500">
            No branch data available
          </div>
        )}
      </div>
    </div>
  );
};
