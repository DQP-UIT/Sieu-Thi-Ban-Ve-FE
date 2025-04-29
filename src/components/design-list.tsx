"use client"

import { IProduct } from "@/types/type";
import React from "react";
import DesignCard from "./ui/design-card";

interface DesignListProps {
  designs: IProduct[];
}
const DesignList: React.FC<DesignListProps> = ({ designs }) => {
  return (
    <div className="w-full flex flex-wrap gap-4 md:gap-8">
      {designs &&
        designs
          .slice(0, 8)
          .map((design) => <DesignCard key={design.id} design={design} />)}
    </div>
  );
};

export default DesignList;
