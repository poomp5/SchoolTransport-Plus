"use client";

import { Bus, ArrowUp, ArrowDown, Clock } from "lucide-react";
import { JSX } from "react";

interface StatItem {
    title: string;
    value: string;
    icon: JSX.Element;
    bgColor: string;
}

const stats: StatItem[] = [
    {
        title: "จำนวนการขึ้นรถทั้งหมด",
        value: "156",
        icon: <Bus className="w-6 h-6 text-blue-600" />,
        bgColor: "bg-blue-100",
    },
    {
        title: "จำนวนการขึ้นรถขาไป",
        value: "78",
        icon: <ArrowUp className="w-6 h-6 text-green-600" />,
        bgColor: "bg-green-100",
    },
    {
        title: "จำนวนการขึ้นรถขากลับ",
        value: "78",
        icon: <ArrowDown className="w-6 h-6 text-purple-600" />,
        bgColor: "bg-purple-100",
    },
    {
        title: "เวลารอรถเฉลี่ย",
        value: "15 นาที",
        icon: <Clock className="w-6 h-6 text-yellow-600" />,
        bgColor: "bg-yellow-100",
    },
];

export default function Page() {
    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4 p-4">สถิติการใช้งานรถรับส่ง</h2>
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
            <div className="p-4">
                <h2 className="text-xl font-bold mb-4">สถานะของรถ</h2>
                <div className="bg-white p-0 rounded-xl shadow-sm">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-2 bg-green-50 rounded-2xl border border-1 border-green-200  ">
                            <div className="flex items-center px-4">
                                <div className="text-green-600 mr-6">ACT07</div>
                                <div>
                                    <p className="font-semibold">นายทดสอบ ระบบ</p>
                                    <p className="text-sm text-gray-500">อยู่ในเส้นทาง</p>
                                </div>
                            </div>
                            <span className="text-green-600 font-medium px-4">ปกติ</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
