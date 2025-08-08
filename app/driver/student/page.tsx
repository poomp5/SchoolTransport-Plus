"use client";

import { Search } from "lucide-react";
import Image from "next/image";
export default function Home() {
    return (
      <div className="m-4">
        <div className="flex items-center gap-4 my-4 mt-10">
          <div className="h-12 w-12 relative">
            <Image
              src="/poom.png"
              alt="poom driver"
              fill
              className="object-cover rounded-full"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">นายปุญญพัฒน์ กูลมนุญ</h3>
              <div className="flex items-center gap-2 bg-green-200 text-green-800 rounded-full px-4 text-nowrap">
                กำลังให้บริการ
              </div>
            </div>
            <p className="text-sm text-muted-foreground">ACT01 · กข 999</p>
          </div>
        </div>
        <div className="bg-white col-span-12 md:col-span-8 rounded-xl">
          <div className="mb-4 flex flex-col md:flex-row justify-between gap-4 p-4 bg-white rounded-t-lg">
            <button
              className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5"
              type="button"
            >
              <span>ดำเนินการ</span>
              <svg
                className="w-2.5 h-2.5 ms-2.5"
                viewBox="0 0 10 6"
                fill="none"
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

            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
              <input
                type="text"
                className="pl-10 py-2 w-full md:w-80 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                placeholder="ค้นหานักเรียน"
              />
            </div>
          </div>
          <div className="overflow-x-auto relative">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    ชื่อนักเรียน
                  </th>
                  <th scope="col" className="px-6 py-3 hidden md:table-cell">
                    ชั้นเรียน
                  </th>
                  <th scope="col" className="px-6 py-3 hidden md:table-cell">
                    เลขประจำตัว
                  </th>
                  <th scope="col" className="px-6 py-3">
                    สถานะ
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <Image
                        src={"/student_nick.jpg"}
                        alt="Student"
                        width={300}
                        height={300}
                        className="rounded-full w-10 h-10"
                      />
                      <div>
                        <div className="font-semibold text-gray-900">
                          นายอิงควัชร์ โอสนานนท์
                        </div>
                        <div className="text-xs text-gray-500 table-cell md:hidden">
                          ม.5/9 · เลขประจำตัว 27147
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <span className="bg-gray-100 text-gray-800 text-sm font-medium px-2.5 py-0.5 rounded">
                      ม.5/9
                    </span>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <span className="bg-gray-100 text-gray-800 text-sm font-medium px-2.5 py-0.5 rounded">
                      27147
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="bg-gray-400 hover:bg-green-800 text-white px-3 py-1.5 rounded-lg">
                      รับนักเรียน
                    </button>
                  </td>
                </tr>
                <tr className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <Image
                        src={"/student_cotton.jpg"}
                        alt="Student Poom"
                        width={300}
                        height={300}
                        className="rounded-full w-10 h-10"
                      />
                      <div>
                        <div className="font-semibold text-gray-900">
                          นายศรัณยพงศ์ อัญญธนากร
                        </div>
                        <div className="text-xs text-gray-500 table-cell md:hidden">
                          ม.5/9 · เลขประจำตัว 27178
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <span className="bg-gray-100 text-gray-800 text-sm font-medium px-2.5 py-0.5 rounded">
                      ม.5/9
                    </span>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <span className="bg-gray-100 text-gray-800 text-sm font-medium px-2.5 py-0.5 rounded">
                      27178
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="bg-gray-400 hover:bg-green-800 text-white px-3 py-1.5 rounded-lg">
                      รับนักเรียน
                    </button>
                  </td>
                </tr>
                <tr className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <Image
                        src={"/student_poom.jpg"}
                        alt="Student Poom"
                        width={300}
                        height={300}
                        className="rounded-full w-10 h-10"
                      />
                      <div>
                        <div className="font-semibold text-gray-900">
                          นายปุญญพัฒน์ กูลมนุญ
                        </div>
                        <div className="text-xs text-gray-500 table-cell md:hidden">
                          ม.5/9 · เลขประจำตัว 27200
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <span className="bg-gray-100 text-gray-800 text-sm font-medium px-2.5 py-0.5 rounded">
                      ม.5/9
                    </span>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <span className="bg-gray-100 text-gray-800 text-sm font-medium px-2.5 py-0.5 rounded">
                      27200
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="bg-green-800 text-white px-3 py-1.5 rounded-lg">
                      ขึ้นรถแล้ว
                    </button>
                  </td>
                </tr>
                <tr className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <Image
                        src={"/student_tete.jpg"}
                        alt="Student Poom"
                        width={300}
                        height={300}
                        className="rounded-full w-10 h-10"
                      />
                      <div>
                        <div className="font-semibold text-gray-900">
                          นายณัฐสิทธิ์ มานะปิยวงศ์
                        </div>
                        <div className="text-xs text-gray-500 table-cell md:hidden">
                          ม.5/9 · เลขประจำตัว 27194
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <span className="bg-gray-100 text-gray-800 text-sm font-medium px-2.5 py-0.5 rounded">
                      ม.5/9
                    </span>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <span className="bg-gray-100 text-gray-800 text-sm font-medium px-2.5 py-0.5 rounded">
                      27194
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="bg-red-800 text-white px-3 py-1.5 rounded-lg text-nowrap">
                      วันนี้ไม่ขึ้นรถ
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
}