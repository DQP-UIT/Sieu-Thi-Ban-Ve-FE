"use client";

import FengShuiInput from "@/components/fengshui-input";
import FengShuiOutput from "@/components/fengshui-output";
import { useFengShuiStore } from "@/store/fengshui-store";
import React from "react";

const FengshuiPage = () => {
  const { isOutputVisible } = useFengShuiStore();

  return (
    <div className="w-full flex flex-wrap items-center">
      {isOutputVisible ? <FengShuiOutput /> : <FengShuiInput />}
    </div>
  );
};

export default FengshuiPage;
