"use client"

import DesignList from '@/components/design-list'
import ColumnGraph from '@/components/ui/column-graph'
import DesignCard from '@/components/ui/design-card'
import DoughnutChart from '@/components/ui/doughnut-graph'
import { mockProduct } from '@/types/type'
import React from 'react'

const mockList = [
  mockProduct, mockProduct, mockProduct, mockProduct,mockProduct,
  mockProduct,mockProduct,mockProduct,mockProduct

]
const chartData = {
  labels: [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ],
  datasets: [
    {
      label: "Doanh thu theo tháng",
      data: [
        65000000, 59000000, 80000000, 81000000, 56000000, 55000000, 70000000,
        60000000, 62000000, 65000000, 70000000, 75000000,
      ],
    },
  ],
};

const mockLabels = ["Admin", "Designer", "Receptionist"];
const mockData = [5, 8, 3];
const SearchResult = () => {
  return (
    <div>
        <div className='w-full'>
            <DesignList designs={mockList}  />
        </div>
    </div>
  )
}

export default SearchResult