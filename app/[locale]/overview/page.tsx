"use client";
"use client";
import { Bus, ArrowUp, ArrowDown, Clock } from "lucide-react";
import { JSX } from "react";
import { useTranslations } from "next-intl";
import UserBusChart from "@/components/user-bus-chart";

interface StatItem {
  title: string;
  value: string;
  icon: JSX.Element;
  bgColor: string;
}

export default function Page() {
  const t = useTranslations("status");
  const o = useTranslations("overview");
  const stats: StatItem[] = [
    {
      title: t("totalBoardings"),
      value: "156",
      icon: <Bus className="w-6 h-6 text-blue-600" />,
      bgColor: "bg-blue-100",
    },
    {
      title: t("boardingsOut"),
      value: "78",
      icon: <ArrowUp className="w-6 h-6 text-green-600" />,
      bgColor: "bg-green-100",
    },
    {
      title: t("boardingsBack"),
      value: "78",
      icon: <ArrowDown className="w-6 h-6 text-purple-600" />,
      bgColor: "bg-purple-100",
    },
    {
      title: t("avgWait"),
      value: t("minutes", { count: 15 }),
      icon: <Clock className="w-6 h-6 text-yellow-600" />,
      bgColor: "bg-yellow-100",
    },
  ];
  return (
    <div className="p-4 md:p-8 bg-gradient-to-b from-gray-50 to-white min-h-screen mb-24">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        {o("statsTitle")}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-5 rounded-2xl shadow-md hover:shadow-lg transition-all duration-200"
          >
            <div className="flex items-center">
              <div className={`p-3 rounded-xl ${stat.bgColor} mr-4`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-gray-500 text-sm">{stat.title}</p>
                <p className="text-2xl font-semibold text-gray-800">
                  {stat.value}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mt-10 mb-4">
        {o("busStatus")}
      </h2>
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-green-50 border border-green-200 rounded-2xl shadow-sm">
          <div className="flex items-center w-full sm:w-auto mb-2 sm:mb-0">
            <span className="text-green-700 text-sm font-bold bg-green-100 px-3 py-1 rounded-lg mr-4">
              ACT07
            </span>
            <div>
              <p className="text-gray-800 font-medium">นายทดสอบ ระบบ</p>
              <p className="text-sm text-gray-500">{o("enRoute")}</p>
            </div>
          </div>
          <span className="inline-block text-sm font-semibold text-green-800 bg-green-200 px-4 py-1 rounded-full">
            {o("normal")}
          </span>
        </div>
      </div>
      <section className="mt-10">
        <UserBusChart />
      </section>
    </div>
  );
}
