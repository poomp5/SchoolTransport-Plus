"use client";

import { Bus, ArrowUp, ArrowDown, Clock } from "lucide-react";
import { JSX } from "react";
import { useTranslations } from "next-intl";

interface StatItem {
    title: string;
    value: string;
    icon: JSX.Element;
    bgColor: string;
}

const Stats = () => {
    const t = useTranslations("status");
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
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">{t("statsTitle")}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white p-4 rounded-xl shadow-sm">
                        <div className="flex items-center">
                            <div className={`p-3 rounded-lg ${stat.bgColor} mr-4`}>{stat.icon}</div>
                            <div>
                                <p className="text-sm text-gray-500">{stat.title}</p>
                                <p className="text-xl font-bold">{stat.value}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Stats;
