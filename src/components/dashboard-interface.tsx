"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import DoughnutChart from "./ui/doughnut-graph";
import ColumnGraph from "./ui/column-graph";

interface RoleStatistic {
  role: string;
  count: number;
}

interface BookingStatistic {
  month: string;
  count: number;
}

interface ProductStatistic {
  month: string;
  count: number;
}

interface StatisticsData {
  roles: RoleStatistic[];
  booking: BookingStatistic[];
  products?: ProductStatistic[]; // Add products to the interface
}

const DashboardInterface: React.FC = () => {
  const [statistics, setStatistics] = useState<StatisticsData | null>(null);
  const [productStats, setProductStats] = useState<ProductStatistic[] | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    fetchStatistics();
  }, [session?.accessToken]);

  const fetchStatistics = async () => {
    try {
      setIsLoading(true);

      // Fetch both statistics and product data
      const [statsResponse, productResponse] = await Promise.all([
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/static/static`, {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }),
        axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/product/count-by-month/product`,
          {
            headers: {
              Authorization: `Bearer ${session?.accessToken}`,
            },
          }
        ),
      ]);

      setStatistics(statsResponse.data);
      setProductStats(productResponse.data);
    } catch (error) {
      console.error("Failed to fetch statistics:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate totals
  const totalUsers =
    statistics?.roles.reduce((sum, role) => sum + role.count, 0) || 0;
  const totalBookings =
    statistics?.booking.reduce((sum, month) => sum + month.count, 0) || 0;
  const totalProducts =
    productStats?.reduce((sum, month) => sum + month.count, 0) || 0;

  // Prepare data for charts
  const roleLabels =
    statistics?.roles.map(
      (role) => role.role.charAt(0).toUpperCase() + role.role.slice(1)
    ) || [];

  const roleData = statistics?.roles.map((role) => role.count) || [];

  const roleColors = [
    "rgba(255, 99, 132, 0.8)", // Admin - Red
    "rgba(54, 162, 235, 0.8)", // Receptionist - Blue
    "rgba(255, 206, 86, 0.8)", // User - Yellow
    "rgba(75, 192, 192, 0.8)", // Additional colors if needed
    "rgba(153, 102, 255, 0.8)",
  ];

  const monthLabels = statistics?.booking.map((item) => item.month) || [];
  const monthData = statistics?.booking.map((item) => item.count) || [];
  const productMonthData = productStats?.map((item) => item.count) || [];

  const bookingDatasets = [
    {
      label: "Số lượng booking",
      data: monthData,
      backgroundColor: monthData.map(() => "rgba(54, 162, 235, 0.6)"),
      borderColor: monthData.map(() => "rgba(54, 162, 235, 1)"),
      borderWidth: 1,
    },
  ];

  const productDatasets = [
    {
      label: "Số lượng bản vẽ",
      data: productMonthData,
      backgroundColor: productMonthData.map(() => "rgba(75, 192, 192, 0.6)"),
      borderColor: productMonthData.map(() => "rgba(75, 192, 192, 1)"),
      borderWidth: 1,
    },
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard Thống Kê</h1>
        <button
          onClick={fetchStatistics}
          className="btn btn-primary"
          disabled={isLoading}
        >
          {isLoading ? "Đang tải..." : "Làm mới"}
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="stat bg-base-100 shadow rounded-lg">
          <div className="stat-figure text-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-8 h-8 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              ></path>
            </svg>
          </div>
          <div className="stat-title">Tổng số tác nhân</div>
          <div className="stat-value text-primary">{totalUsers}</div>
          <div className="stat-desc">Trong hệ thống</div>
        </div>

        <div className="stat bg-base-100 shadow rounded-lg">
          <div className="stat-figure text-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-8 h-8 stroke-current"
            >
              <path
                strokeLinecap="round"
                d="M11.029 2.54a2 2 0 0 1 1.942 0l7.515 4.174a1 1 0 0 1 .514.874v8.235a2 2 0 0 1-1.029 1.749l-7 3.888a2 2 0 0 1-1.942 0l-7-3.889A2 2 0 0 1 3 15.824V7.588a1 1 0 0 1 .514-.874z"
              ></path>
              <path d="m3 7l9 5m0 0l9-5m-9 5v10"></path>
              <path strokeLinecap="round" d="m7.5 9.5l9-5M6 12.328L9 14"></path>
            </svg>
          </div>
          <div className="stat-title">
            Tổng booking năm {new Date().getFullYear()}
          </div>
          <div className="stat-value text-secondary">{totalBookings}</div>
          <div className="stat-desc">Đã được tạo</div>
        </div>

        <div className="stat bg-base-100 shadow rounded-lg">
          <div className="stat-figure text-success">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-8 h-8 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              ></path>
            </svg>
          </div>
          <div className="stat-title">
            Tổng bản vẽ năm {new Date().getFullYear()}
          </div>
          <div className="stat-value text-success">{totalProducts}</div>
          <div className="stat-desc">Đã được upload</div>
        </div>

        <div className="stat bg-base-100 shadow rounded-lg">
          <div className="stat-figure text-accent">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-8 h-8 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
              ></path>
            </svg>
          </div>
          <div className="stat-title">Admin</div>
          <div className="stat-value text-accent">
            {statistics?.roles.find((r) => r.role === "admin")?.count || 0}
          </div>
          <div className="stat-desc">Quản trị viên</div>
        </div>

        <div className="stat bg-base-100 shadow rounded-lg">
          <div className="stat-figure text-info">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-8 h-8 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
              ></path>
            </svg>
          </div>
          <div className="stat-title">Lễ tân</div>
          <div className="stat-value text-info">
            {statistics?.roles.find((r) => r.role === "receptionist")?.count ||
              0}
          </div>
          <div className="stat-desc">Nhân viên lễ tân</div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Role Distribution Chart */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-center mb-4">
              Phân bổ tác nhân theo vai trò
            </h2>
            <div className="flex justify-center">
              <div className="w-80 h-80">
                <DoughnutChart
                  labels={roleLabels}
                  data={roleData}
                  colors={roleColors}
                />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex flex-wrap gap-2 justify-center">
                {statistics?.roles.map((role, index) => (
                  <div key={role.role} className="badge badge-outline">
                    <div
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: roleColors[index] }}
                    ></div>
                    {role.role}: {role.count}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Booking Trends Chart */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-center mb-4">
              Xu hướng booking theo tháng ({new Date().getFullYear()})
            </h2>
            <div className="h-80">
              <ColumnGraph labels={monthLabels} datasets={bookingDatasets} />
            </div>
            <div className="mt-4 text-center">
              <div className="stat">
                <div className="stat-title">Tháng có nhiều booking nhất</div>
                <div className="stat-value text-sm">
                  {
                    statistics?.booking.reduce(
                      (max, month) => (month.count > max.count ? month : max),
                      { month: "Không có", count: 0 }
                    ).month
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Charts Section */}
      <div className="grid grid-cols-1 gap-6">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-center mb-4">
              Xu hướng upload bản vẽ theo tháng ({new Date().getFullYear()})
            </h2>
            <div className="w-full">
              <div className="h-[500px]">
                <ColumnGraph labels={monthLabels} datasets={productDatasets} />
              </div>
            </div>
            <div className="mt-auto flex justify-center">
              <div className="stats shadow text-center">
                <div className="stat">
                  <div className="stat-title">
                    Tháng có nhiều bản vẽ upload nhất
                  </div>
                  <div className="stat-value text-primary">
                    {
                      productStats?.reduce(
                        (max, month) => (month.count > max.count ? month : max),
                        { month: "Không có", count: 0 }
                      ).month
                    }
                  </div>
                  <div className="stat-desc">
                    {
                      productStats?.reduce(
                        (max, month) => (month.count > max.count ? month : max),
                        { month: "Không có", count: 0 }
                      ).count
                    }{" "}
                    bản vẽ
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Info Section */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Thông tin chi tiết</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Tác nhân theo vai trò:</h3>
              <ul className="space-y-1">
                {statistics?.roles.map((role) => (
                  <li key={role.role} className="flex justify-between">
                    <span className="capitalize">{role.role}:</span>
                    <span className="font-bold">{role.count}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Booking có hoạt động:</h3>
              <ul className="space-y-1">
                {statistics?.booking
                  .filter((month) => month.count > 0)
                  .map((month) => (
                    <li key={month.month} className="flex justify-between">
                      <span>{month.month}:</span>
                      <span className="font-bold">{month.count}</span>
                    </li>
                  ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Bản vẽ được upload:</h3>
              <ul className="space-y-1">
                {productStats
                  ?.filter((month) => month.count > 0)
                  .map((month) => (
                    <li key={month.month} className="flex justify-between">
                      <span>{month.month}:</span>
                      <span className="font-bold">{month.count}</span>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardInterface;
