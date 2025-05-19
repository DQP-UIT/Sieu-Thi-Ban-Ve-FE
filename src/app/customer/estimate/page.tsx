"use client";

import React from "react";
import { useEstimateFormStore } from "@/store/estimate-store";
import EstimateInput1 from "@/components/estimate-input-part1";
import EstimateInput2 from "@/components/estimate-input-part2";
import EstimateOutput from "@/components/estimate-output";

const EstimatePage = () => {
  const { isInput2Available, isOutputAvailable } = useEstimateFormStore();

  return (
    <div className="container mx-auto px-4 py-8">
      {!isInput2Available && !isOutputAvailable && <EstimateInput1 />}
      {isInput2Available && !isOutputAvailable && <EstimateInput2 />}
      {isOutputAvailable && <EstimateOutput />}
    </div>
  );
};

export default EstimatePage;
