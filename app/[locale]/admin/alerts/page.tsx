"use client";

import { useState } from "react";
import { Check, X, Phone, Info } from "lucide-react";
import AdminSidebar from "@/components/admin-sidebar";

type StatusChecks = {
    [key: number]: boolean;
};

export default function Home() {
    const [statusChecks, setStatusChecks] = useState<StatusChecks>({
        0: false,
        1: false,
        2: false
    });

    const toggleStatus = (index: number) => {
        setStatusChecks((prev: StatusChecks) => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    return (
        <div className="flex min-h-screen mb-24">
            <AdminSidebar />
            <div className="flex-1 lg:ml-64 md:mb-24">
                <div className="flex-1 mt-8 px-2 sm:px-4">
                    <div className="bg-white border border-1 border-gray-100 rounded-lg p-2 sm:p-4">
                        <h1 className="text-xl sm:text-2xl font-semibold text-gray-600 mb-4">การแจ้งเตือน & เหตุฉุกเฉิน</h1>
                        <div className="overflow-x-auto -mx-2 sm:mx-0">
                            <table className="w-full text-xs sm:text-sm text-left text-gray-500 border-collapse">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-2 sm:px-6 py-2 sm:py-3">#</th>
                                        <th scope="col" className="px-2 sm:px-6 py-2 sm:py-3">ชื่อ</th>
                                        <th scope="col" className="px-2 sm:px-6 py-2 sm:py-3 hidden sm:table-cell">รายละเอียด</th>
                                        <th scope="col" className="px-2 sm:px-6 py-2 sm:py-3 hidden sm:table-cell">นักเรียน</th>
                                        <th scope="col" className="px-2 sm:px-6 py-2 sm:py-3 hidden sm:table-cell">วันที่</th>
                                        <th scope="col" className="px-2 sm:px-6 py-2 sm:py-3">การกระทำ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[{
                                        number: 1,
                                        name: "นายปุญญพัฒน์ กูลมนุญ",
                                        details: "ACT01 · กข 999",
                                        status: "รถยางแตกระหว่างทาง",
                                        date: "30 มกราคม 2568",
                                        students: 11
                                    }, {
                                        number: 2,
                                        name: "นายศรัณยพงศ์ อัญญธนากร",
                                        details: "ACT02 · ฮว 456",
                                        status: "กำลังขับออกนอกเส้นทาง",
                                        date: "31 มกราคม 2568",
                                        students: 10
                                    }, {
                                        number: 3,
                                        name: "นายณัฐสิทธิ์ มานะปิยวงศ์",
                                        details: "ACT03 · ฮภ 40",
                                        status: "ไปเติมน้ำมัน",
                                        date: "31 มกราคม 2568",
                                        students: 10
                                    }].map((driver, index) => (
                                        <tr key={index} className="bg-white border-b">
                                            <td className="px-2 sm:px-6 py-2 sm:py-4">{driver.number}</td>
                                            <td className="px-2 sm:px-6 py-2 sm:py-4">
                                                <div>
                                                    <div>{driver.name}</div>
                                                    <div className="sm:hidden text-xs text-gray-500">
                                                        {driver.details}<br />
                                                        <span className={statusChecks[index] ? "text-green-600" : "text-red-600"}>
                                                            {driver.status}
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-2 sm:px-6 py-2 sm:py-4 hidden sm:table-cell">{driver.details}<br />
                                                <span className={statusChecks[index] ? "text-green-600" : "text-red-600"}>
                                                    {driver.status}
                                                </span>
                                            </td>
                                            <td className="px-2 sm:px-6 py-2 sm:py-4 hidden sm:table-cell">{driver.students} คน</td>
                                            <td className="px-2 sm:px-6 py-2 sm:py-4 hidden sm:table-cell">{driver.date}</td>
                                            <td className="px-2 sm:px-6 py-2 sm:py-4">
                                                <div className="flex gap-1 sm:gap-2">
                                                    <button className="bg-gray-800 hover:bg-gray-900 rounded-lg text-white p-1.5 sm:p-2">
                                                        <Info className="w-4 h-4 sm:w-5 sm:h-5" />
                                                    </button>
                                                    <button className="bg-red-800 hover:bg-red-900 rounded-lg text-white p-1.5 sm:p-2">
                                                        <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                                                    </button>
                                                    <button
                                                        className={`rounded-lg text-white p-1.5 sm:p-2 ${statusChecks[index]
                                                            ? "bg-green-600 hover:bg-green-700"
                                                            : "bg-red-600 hover:bg-red-700"
                                                            }`}
                                                        onClick={() => toggleStatus(index)}
                                                    >
                                                        {statusChecks[index]
                                                            ? <Check className="w-4 h-4 sm:w-5 sm:h-5" />
                                                            : <X className="w-4 h-4 sm:w-5 sm:h-5" />
                                                        }
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div></div>
        </div>
    );
}