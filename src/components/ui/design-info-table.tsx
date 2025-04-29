import { IProduct } from "@/types/type";
import React from "react";
import {
  RiBuilding2Line,
  RiRulerLine,
  RiBreadLine,
  RiStore2Line,
  RiPriceTag3Line,
  RiInvisionLine,
  RiMoneyDollarCircleLine,
  RiPaintBrushLine,
  RiUserStarLine,
} from "react-icons/ri";

interface InfoTabProps {
  design: IProduct;
}

const DesignInfoTab: React.FC<InfoTabProps> = ({ design }) => {
  // Format currency with commas
  const formatCurrency = (value: number) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const specificationRows = [
    {
      icon: <RiBuilding2Line size={20} />,
      spec: "Number of Floors",
      value: design.floor,
    },
    {
      icon: <RiRulerLine size={20} />,
      spec: "Square Footage",
      value: `${design.square} m²`,
    },
    {
      icon: <RiBreadLine size={20} />,
      spec: "Bedrooms",
      value: design.numberBedRoom,
    },
    {
      icon: <RiStore2Line size={20} />,
      spec: "Front Width",
      value: `${design.frontAge} m`,
    },
    {
      icon: <RiInvisionLine size={20} />,
      spec: "Dimensions",
      value: design.size,
    },
    {
      icon: <RiMoneyDollarCircleLine size={20} />,
      spec: "Estimated Cost",
      value: `${formatCurrency(design.cost)} VND`,
    },
    {
      icon: <RiPaintBrushLine size={20} />,
      spec: "Architectural Style",
      value: design.style,
    },
    {
      icon: <RiUserStarLine size={20} />,
      spec: "Designer",
      value: design.designedBy,
    },
    {
      icon: <RiPriceTag3Line size={20} />,
      spec: "Product Type",
      value: design.productTypeId,
    },
  ];

  return (
    <div className="overflow-x-auto md:max-w-1/2 rounded-box rounded-lg border border-base-content/5 bg-base-100">
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th className="w-12"></th>
              <th>Specifications</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {specificationRows.map((row, index) => (
              <tr key={index}>
                <th className="text-center text-gray-500">{row.icon}</th>
                <td className="font-medium">{row.spec}</td>
                <td>{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DesignInfoTab;
