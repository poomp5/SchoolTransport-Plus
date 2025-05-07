"use client";

import AdminSidebar from "@/components/admin-sidebar";
import { Search } from "lucide-react";
import Image from "next/image";
export default function Home() {
    return (
        <div className="flex min-h-screen mb-24">
            <AdminSidebar />
            <div className="flex-1 lg:ml-64">
                <div className="m-4">
                    <div className="bg-white col-span-12 md:col-span-8 rounded-xl">
                        <div className="mb-4 flex flex-col md:flex-row justify-between gap-4 p-4 bg-white rounded-t-lg">
                            <button
                                className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5"
                                type="button"
                            >
                                <span>ดำเนินการ</span>
                                <svg className="w-2.5 h-2.5 ms-2.5" viewBox="0 0 10 6" fill="none">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 4 4 4-4" />
                                </svg>
                            </button>

                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                                <input
                                    type="text"
                                    className="pl-10 py-2 w-full md:w-80 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="ค้นหาพนักงานขับรถ"
                                />
                            </div>
                        </div>
                        <div className="overflow-x-auto relative">
                            <table className="w-full text-sm text-left text-gray-500">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">ชื่อพนักงานขับ</th>
                                        <th scope="col" className="px-6 py-3 hidden md:table-cell">หมายเลขรถ</th>
                                        <th scope="col" className="px-6 py-3 hidden md:table-cell">ทะเบียน</th>
                                        <th scope="col" className="px-6 py-3">สถานะ</th>
                                        <th scope="col" className="px-6 py-3">เพิ่มเติม</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="bg-white border-b hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center space-x-3">
                                                <Image
                                                    src="/poom.png"
                                                    alt="Driver Poom"
                                                    width={40}
                                                    height={40}
                                                    className="rounded-full"
                                                />
                                                <div>
                                                    <div className="font-semibold text-gray-900">นายปุญญพัฒน์ กูลมนุญ</div>
                                                    <div className="text-xs text-gray-500 md:hidden">
                                                        <div>TIA01 • อสธ 999</div>
                                                    </div>
                                                    <div className="text-xs text-gray-500">เข้างานเวลา 07:00 น.</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 hidden md:table-cell">
                                            <span className="bg-gray-100 text-gray-800 text-sm font-medium px-2.5 py-0.5 rounded">TIA01</span>
                                        </td>
                                        <td className="px-6 py-4 hidden md:table-cell">
                                            <span className="bg-gray-100 text-gray-800 text-sm font-medium px-2.5 py-0.5 rounded">อสธ 999</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center whitespace-nowrap">
                                                <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2 text-sm md:text-base" />
                                                กำลังเดินทาง
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex space-x-2">
                                                <button className="bg-gray-700 text-white px-4 py-1.5 rounded-lg hover:bg-gray-800">
                                                    แก้ไขข้อมูล
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="bg-white border-b hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center space-x-3">
                                                <Image
                                                    src="/nick.png"
                                                    alt="Driver Nick"
                                                    width={40}
                                                    height={40}
                                                    className="rounded-full"
                                                />
                                                <div>
                                                    <div className="font-semibold text-gray-900">นายอิงควัชร์ โอสนานนท์</div>
                                                    <div className="text-xs text-gray-500 md:hidden">
                                                        <div>TIA02 • อสธ 123</div>
                                                    </div>
                                                    <div className="text-xs text-gray-500">เข้างานเวลา 07:00 น.</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 hidden md:table-cell">
                                            <span className="bg-gray-100 text-gray-800 text-sm font-medium px-2.5 py-0.5 rounded">TIA02</span>
                                        </td>
                                        <td className="px-6 py-4 hidden md:table-cell">
                                            <span className="bg-gray-100 text-gray-800 text-sm font-medium px-2.5 py-0.5 rounded">อสธ 123</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center whitespace-nowrap">
                                                <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2 text-sm md:text-base" />
                                                กำลังเดินทาง
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex space-x-2">
                                                <button className="bg-gray-700 text-white px-4 py-1.5 rounded-lg hover:bg-gray-800">
                                                    แก้ไขข้อมูล
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="bg-white border-b hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center space-x-3">
                                                <Image
                                                    src="/cotton.png"
                                                    alt="Driver Cotton"
                                                    width={40}
                                                    height={40}
                                                    className="rounded-full"
                                                />
                                                <div>
                                                    <div className="font-semibold text-gray-900">นายศรัณยพงศ์ อัญญธนากร</div>
                                                    <div className="text-xs text-gray-500 md:hidden">
                                                        <div>TIA03 • อสธ 456</div>
                                                    </div>
                                                    <div className="text-xs text-gray-500">เข้างานเวลา 07:00 น.</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 hidden md:table-cell">
                                            <span className="bg-gray-100 text-gray-800 text-sm font-medium px-2.5 py-0.5 rounded">TIA03</span>
                                        </td>
                                        <td className="px-6 py-4 hidden md:table-cell">
                                            <span className="bg-gray-100 text-gray-800 text-sm font-medium px-2.5 py-0.5 rounded">อสธ 456</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center whitespace-nowrap">
                                                <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2 text-sm md:text-base" />
                                                กำลังเดินทาง
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex space-x-2">
                                                <button className="bg-gray-700 text-white px-4 py-1.5 rounded-lg hover:bg-gray-800">
                                                    แก้ไขข้อมูล
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="bg-white border-b hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center space-x-3">
                                                <Image
                                                    src="/cotton.png"
                                                    alt="Driver Cotton"
                                                    width={40}
                                                    height={40}
                                                    className="rounded-full"
                                                />
                                                <div>
                                                    <div className="font-semibold text-gray-900">นายณัฐสิทธิ์ มานะปิยวงศ์</div>
                                                    <div className="text-xs text-gray-500 md:hidden">
                                                        <div>TIA04 • อสธ 987</div>
                                                    </div>
                                                    <div className="text-xs text-gray-500">เข้างานเวลา 07:00 น.</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 hidden md:table-cell">
                                            <span className="bg-gray-100 text-gray-800 text-sm font-medium px-2.5 py-0.5 rounded">TIA04</span>
                                        </td>
                                        <td className="px-6 py-4 hidden md:table-cell">
                                            <span className="bg-gray-100 text-gray-800 text-sm font-medium px-2.5 py-0.5 rounded">อสธ 987</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center whitespace-nowrap">
                                                <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2 text-sm md:text-base" />
                                                กำลังเดินทาง
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex space-x-2">
                                                <button className="bg-gray-700 text-white px-4 py-1.5 rounded-lg hover:bg-gray-800">
                                                    แก้ไขข้อมูล
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}