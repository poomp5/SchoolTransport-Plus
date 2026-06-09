"use client";

import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";

// ใช้ dynamic import เพื่อเลี่ยง SSR error
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function UserBusChart() {
  const t = useTranslations("status");

  const chartOptions: ApexCharts.ApexOptions = {
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
      categories: [t("mon"), t("tue"), t("wed"), t("thu"), t("fri")],
    },
    yaxis: {
      title: { text: t("chartYAxis") },
    },
    colors: ["#1E90FF", "#FF7F50"],
    legend: {
      position: "top",
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
  };

  const series = [
    {
      name: t("outbound"),
      data: [12, 14, 11, 15, 10],
    },
    {
      name: t("return"),
      data: [10, 13, 9, 14, 12],
    },
  ];

  return (
    <div className="bg-white p-5 rounded-2xl shadow-md">
      <h3 className="text-lg font-semibold mb-3 text-gray-700">
        {t("chartTitle")}
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
