"use client";

import { Users, Settings, Bell, Menu, X, Bus, BadgeCheck, Car, Info, Phone } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import Map from "@/components/map";

export default function Home() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <div className="flex min-h-screen mb-24">
            <button
                className="fixed left-4 top-4 z-50 rounded-lg bg-[#8B0000] p-2 text-white lg:hidden"
                onClick={toggleMobileMenu}
            >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            <div
                className={`fixed left-0 top-0 z-40 h-full w-64 transform bg-[#8B0000] text-white transition-transform duration-300 ease-in-out lg:translate-x-0 ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="flex items-center gap-2 p-4 pt-16 lg:pt-4">
                    <div className="h-12 w-12 rounded"><Image src={'/logo.png'} width={300} height={300} alt="logo"/></div>
                    <div className="text-lg font-bold">
                        SCHOOL
                        <br />
                        TRANSPORT +
                    </div>
                </div>

                {/* Navigation */}
                <nav className="mt-8">
                    <Link
                        href="/admin"
                        className="flex items-center gap-4 bg-[#6B0000] px-6 py-4 text-white"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        <div className="grid h-6 w-6 place-items-center">
                            <Users className="h-5 w-5" />
                        </div>
                        <span>ภาพรวม</span>
                    </Link>
                    <Link
                        href="/settings"
                        className="flex items-center gap-4 px-6 py-4 text-white hover:bg-[#6B0000]"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        <div className="grid h-6 w-6 place-items-center">
                            <Settings className="h-5 w-5" />
                        </div>
                        <span>ตั้งค่าระบบ</span>
                    </Link>
                    <Link
                        href="/users"
                        className="flex items-center gap-4 px-6 py-4 text-white hover:bg-[#6B0000]"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        <div className="grid h-6 w-6 place-items-center">
                            <Users className="h-5 w-5" />
                        </div>
                        <span>ตั้งค่าผู้ใช้งาน</span>
                    </Link>
                    <Link
                        href="/alerts"
                        className="flex items-center gap-4 px-6 py-4 text-white hover:bg-[#6B0000]"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        <div className="grid h-6 w-6 place-items-center">
                            <Bell className="h-5 w-5" />
                        </div>
                        <span>เหตุฉุกเฉิน</span>
                    </Link>
                </nav>
            </div>
            <div className="flex-1 lg:ml-64">
                <div className="min-w-fit mx-4 h-1/2">
                    <Map />
                </div>

                <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="flex items-center justify-between rounded-lg bg-yellow-800 p-4 text-white">
                        <div>
                            <div className="text-2xl font-bold sm:text-3xl">26 คัน</div>
                            <div className="text-sm">กำลังเดินทาง</div>
                        </div>
                        <div className="text-3xl sm:text-4xl bg-yellow-900 p-3 rounded-full">
                            <Bus />
                        </div>
                    </div>
                    <div className="flex items-center justify-between rounded-lg bg-green-800 p-4 text-white">
                        <div>
                            <div className="text-2xl font-bold sm:text-3xl">8 คัน</div>
                            <div className="text-sm">ถึงโรงเรียนแล้ว</div>
                        </div>
                        <div className="text-3xl sm:text-4xl bg-green-900 p-3 rounded-full">
                            <BadgeCheck />
                        </div>
                    </div>
                    <div className="flex items-center justify-between rounded-lg bg-purple-800 p-4 text-white">
                        <div>
                            <div className="text-2xl font-bold sm:text-3xl">1 คัน</div>
                            <div className="text-sm">กำลังรับนักเรียน</div>
                        </div>
                        <div className="text-3xl sm:text-4xl bg-purple-900 p-3 rounded-full">
                            <Car />
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-12 mx-4 gap-4">
                    <div className="rounded-lg p-4 text-white col-span-full md:col-span-8">
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                            <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white">
                                <div>
                                    <button
                                        id="dropdownActionButton"
                                        data-dropdown-toggle="dropdownAction"
                                        className="mx-4 inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                                        type="button"
                                    >
                                        <span className="sr-only">ดำเนินการ</span>
                                        ดำเนินการ
                                        <svg
                                            className="w-2.5 h-2.5 ms-2.5"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 10 6"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="m1 1 4 4 4-4"
                                            />
                                        </svg>
                                    </button>
                                </div>
                                <div className="relative mx-4">
                                    <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                                        <svg
                                            className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                            />
                                        </svg>
                                    </div>
                                    <input
                                        type="text"
                                        id="table-search-users"
                                        className="block ps-10 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="ค้นหาพนักงานขับรถ"
                                    />
                                </div>
                            </div>
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                    <tr>
                                        <th scope="col" className="p-4">
                                            <div className="flex items-center">
                                                <input
                                                    id="checkbox-all-search"
                                                    type="checkbox"
                                                    className="w-4 h-4 text-gray-800 bg-gray-100 border-gray-300 rounded focus:ring-gray-500"
                                                />
                                                <label htmlFor="checkbox-all-search" className="sr-only">
                                                    checkbox
                                                </label>
                                            </div>
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            ชื่อพนักงานขับ
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            หมายเลขรถ
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            ทะเบียน
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            สถานะ
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            เพิ่มเติม
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td className="w-4 p-4">
                                            <div className="flex items-center">
                                                <input
                                                    id="checkbox-table-search-1"
                                                    type="checkbox"
                                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                />
                                                <label htmlFor="checkbox-table-search-1" className="sr-only">
                                                    checkbox
                                                </label>
                                            </div>
                                        </td>
                                        <th
                                            scope="row"
                                            className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                                        >
                                            <Image className="w-10 h-10 rounded-full" src={'/poom_suit.png'} alt="poom suit" width={300} height={300}/>
                                            <div className="ps-3">
                                                <div className="text-base font-semibold">นายปุญญพัฒน์ กูลมนุญ</div>
                                                <div className="font-normal text-gray-500">
                                                    เข้างานเวลา 07:00 น.
                                                </div>
                                            </div>
                                        </th>
                                        <td className="px-6 py-4"><span className="bg-gray-100 text-gray-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded">ACT01</span></td>
                                        <td className="px-6 py-4"><span className="bg-gray-100 text-gray-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded">กข 999</span></td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2" />{" "}
                                                กำลังเดินทาง
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button className="text-white bg-gray-800 p-1.5 rounded-lg mx-1"><Info size={16}/></button>
                                            <button className="text-white bg-red-800 p-1.5 rounded-lg"><Phone size={16}/></button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div
                                id="editUserModal"
                                tabIndex={-1}
                                aria-hidden="true"
                                className="fixed top-0 left-0 right-0 z-50 items-center justify-center hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
                            >
                            </div>
                        </div>
                    </div>
                    <div className="rounded-lg bg-[#333] p-4 text-white col-span-4">
                        <div className="mb-2 text-lg font-bold">แจ้งเตือน</div>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <div className="h-8 w-8"><Image className="rounded-full" src={'/poom_suit.png'} alt="poom suit" width={300} height={300}/></div>
                                <div>
                                    <div className="text-sm">นายทดสอบ ระบบ</div>
                                    <div className="text-xs text-gray-400">ยางแตก</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-8 w-8"><Image className="rounded-full" src={'/poom_suit.png'} alt="poom suit" width={300} height={300}/></div>
                                <div>
                                    <div className="text-sm">นายทดสอบ ระบบ</div>
                                    <div className="text-xs text-gray-400">ออกนอกเส้นทาง</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-8 w-8"><Image className="rounded-full" src={'/poom_suit.png'} alt="poom suit" width={300} height={300}/></div>
                                <div>
                                    <div className="text-sm">นายทดสอบ ระบบ</div>
                                    <div className="text-xs text-gray-400">หมดสติ</div>
                                </div>
                            </div>
                           
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}