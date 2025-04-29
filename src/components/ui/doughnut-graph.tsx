import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export interface DoughnutChartProps {
  labels: string[];
  data: number[];
  colors?: string[]; 
}

const DoughnutChart: React.FC<DoughnutChartProps> = ({
  labels,
  data,
  colors,
}) => {
  const defaultColors = [
    "rgba(255, 99, 132, 0.6)", // Admin
    "rgba(54, 162, 235, 0.6)", // Designer
    "rgba(255, 206, 86, 0.6)", // Receptionist
  ];

  const chartData = {
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColor: colors || defaultColors,
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "right" as const,
      },
      title: {
        display: true,
        text: "Phân bố vai trò trong hệ thống",
      },
    },
  };

  return (
    <div className="w-full sm:max-w-3xl">
      <Doughnut data={chartData} options={options} />
    </div>
  );
};

export default DoughnutChart;
