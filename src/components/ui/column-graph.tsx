import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


export interface ColumnGraphDataset {
  label: string;
  data: number[];
  backgroundColor?: string[];
  borderColor?: string[];
  borderWidth?: number;
}

export interface ColumnGraphProps {
  labels: string[];
  datasets: ColumnGraphDataset[];
}

const seasonColors = {
  spring: [
    "rgba(255, 99, 132, 0.5)", // Tháng 1
    "rgba(255, 159, 64, 0.5)", // Tháng 2
    "rgba(255, 205, 86, 0.5)", // Tháng 3
  ],
  summer: [
    "rgba(75, 192, 192, 0.5)", // Tháng 4
    "rgba(54, 162, 235, 0.5)", // Tháng 5
    "rgba(153, 102, 255, 0.5)", // Tháng 6
  ],
  autumn: [
    "rgba(255, 159, 64, 0.5)", // Tháng 7
    "rgba(75, 192, 192, 0.5)", // Tháng 8
    "rgba(255, 99, 132, 0.5)", // Tháng 9
  ],
  winter: [
    "rgba(54, 162, 235, 0.5)", // Tháng 10
    "rgba(153, 102, 255, 0.5)", // Tháng 11
    "rgba(201, 203, 207, 0.5)", // Tháng 12
  ],
};

const assignSeasonalColors = (datasets: ColumnGraphDataset[]) => {
  const colorMapping = [
    ...seasonColors.spring, // Tháng 1-3
    ...seasonColors.summer, // Tháng 4-6
    ...seasonColors.autumn, // Tháng 7-9
    ...seasonColors.winter, // Tháng 10-12
  ];

  return datasets.map((ds, index) => ({
    ...ds,
    backgroundColor: colorMapping,
    borderColor: colorMapping.map(color => color.replace("0.5","1")),
    borderWidth: 1,
  }));
};

const ColumnGraph = ({ labels, datasets }: ColumnGraphProps) => {
  const updatedChartData = assignSeasonalColors(datasets);
  console.log("Chart data1:", updatedChartData);
  
  const data = { labels, datasets: updatedChartData };
  const options = {
    responsive: true,
    plugins: {
      legend: { display: true },
      title: { display: true, text: "Biểu đồ doanh thu theo tháng" },
    },
  };

  return (
    <div className="w-full md:max-w-5xl">
      <Bar data={data} options={options} />
    </div>
  );
};

export default ColumnGraph;
