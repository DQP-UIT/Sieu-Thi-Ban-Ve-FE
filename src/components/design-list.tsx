"use client"

import { IProduct } from "@/types/type";
import React from "react";
import DesignCard from "./ui/design-card";

interface DesignListProps {
  designs: IProduct[];
}
const DesignList: React.FC<DesignListProps> = ({ designs }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8 w-full">
      {designs.map((design) => (
        <DesignCard key={design.id} design={design} />
      ))}
    </div>
  );
};



export default DesignList;
