"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

// ใช้ dynamic import เพื่อเลี่ยง SSR error
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function UserBusChart() {
  const [chartOptions] = useState<ApexCharts.ApexOptions>({
    chart: {
      type: "line",
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    xaxis: {
      categories: ["จันทร์", "อังคาร", "พุธ", "พฤหัส", "ศุกร์"],
    },
    yaxis: {
      title: { text: "จำนวนครั้ง" },
    },
    colors: ["#1E90FF", "#FF7F50"],
    legend: {
      position: "top",
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
  });

  const [series] = useState([
    {
      name: "ขาไป",
      data: [12, 14, 11, 15, 10],
    },
    {
      name: "ขากลับ",
      data: [10, 13, 9, 14, 12],
    },
  ]);

  return (
    <div className="bg-white p-5 rounded-2xl shadow-md">
      <h3 className="text-lg font-semibold mb-3 text-gray-700">
        สถิติการขึ้นรถรายวัน
      </h3>
      <div className="relative w-full min-h-[250px]">
        <Chart
          options={chartOptions}
          series={series}
          type="line"
          width="100%"
          height="100%"
        />
      </div>
    </div>
  );
}
