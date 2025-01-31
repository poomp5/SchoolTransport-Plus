"use client";

import AdminSidebar from "@/components/admin-sidebar";
import Image from "next/image";

export default function Home() {
    return (
        <div className="flex min-h-screen mb-24">
            <AdminSidebar />
            <div className="flex-1 lg:ml-64 mt-8">
                <div className="mx-4 bg-white border border-1 border-gray-100 rounded-lg p-4">
                    <h1 className="text-2xl font-semibold text-gray-600 mb-4">การแจ้งเตือน & เหตุฉุกเฉิน</h1>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-500 border-collapse">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3">#</th>
                                    <th scope="col" className="px-6 py-3">ชื่อ</th>
                                    <th scope="col" className="px-6 py-3">รายละเอียด</th>
                                    <th scope="col" className="px-6 py-3">นักเรียน</th>
                                    <th scope="col" className="px-6 py-3">วันที่</th>
                                    <th scope="col" className="px-6 py-3">การกระทำ</th>
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
                                    details: "ACT03 · ฮว 456",
                                    status: "กำลังขับออกนอกเส้นทาง",
                                    date: "31 มกราคม 2568",
                                    students: 10
                                }].map((driver, index) => (
                                    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <td className="px-6 py-4">{driver.number}</td>
                                        <td className="px-6 py-4">{driver.name}</td>
                                        <td className="px-6 py-4">{driver.details}<br /><span className="text-red-600">{driver.status}</span></td>
                                        <td className="px-6 py-4">{driver.students} คน</td>
                                        <td className="px-6 py-4">{driver.date}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                <button className="bg-gray-800 hover:bg-gray-900 rounded-lg text-white py-1 px-3">
                                                    ตรวจสอบ
                                                </button>
                                                <button className="bg-red-800 hover:bg-red-900 rounded-lg text-white py-1 px-3">
                                                    เริ่มการโทร
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
