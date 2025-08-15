"use client";

import { useState } from "react";
import CameraModal from "@/components/camera-model";
import AdminSidebar from "@/components/admin-sidebar";
import Link from "next/link";
import { Plus, Video } from "lucide-react";

export default function CameraPage() {
  const [selectedCarId, setSelectedCarId] = useState<string | null>(null);

  const cars = [
    { id: "TIA01", driver: "นายปุญญพัฒน์ กูลมนุญ", students: 4 },
    { id: "TIA02", driver: "นายศรัณยพงศ์ อัญญธนากร", students: 3 },
    { id: "TIA03", driver: "นายณัฐสิทธิ์ มานะปิยวงศ์", students: 5 },
  ];

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />

      <div className="flex-1 lg:ml-64 bg-gray-100">
        {/* Header */}
        <div className="px-4 sm:px-6 pt-6 mb-4">
          <div className="flex items-center justify-between gap-2">
            <h1 className="text-2xl font-bold text-gray-800">
              ระบบกล้องตรวจจับใบหน้า
            </h1>
            <Link href="/admin/enroll" className="shrink-0">
              <button className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg inline-flex items-center gap-2">
                <Plus className="w-5 h-5" />
                เพิ่มข้อมูล
              </button>
            </Link>
          </div>
        </div>

        {/* Content: 2 columns on desktop, stacked on mobile */}
        <div className="px-4 sm:px-6 pb-6">
          <div
            className="
              grid grid-cols-1 gap-4 lg:gap-6
              lg:grid-cols-[420px,1fr]
            "
          >
            {/* Left column: cars list (sticky + scroll) */}
            <div className="lg:h-[calc(100vh-6rem)] lg:sticky lg:top-6">
              <div className="bg-white rounded-2xl shadow p-4 sm:p-5 h-full flex flex-col">
                <div className="mb-3 flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-800">
                    รายการรถทั้งหมด
                  </h2>
                  <span className="text-sm text-gray-500">
                    {cars.length} คัน
                  </span>
                </div>

                <div
                  className="space-y-3 overflow-y-auto pr-1 lg:pr-2"
                  style={{ scrollbarWidth: "thin" }}
                >
                  {cars.map((car) => {
                    const selected = selectedCarId === car.id;
                    return (
                      <button
                        key={car.id}
                        onClick={() =>
                          setSelectedCarId((prev) =>
                            prev === car.id ? null : car.id
                          )
                        }
                        className={[
                          "w-full text-left rounded-2xl border shadow-sm p-4 transition",
                          selected
                            ? "bg-gray-700 text-white border-gray-700 shadow"
                            : "bg-white hover:bg-gray-50",
                        ].join(" ")}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="text-base font-semibold">
                              รถ {car.id}
                            </div>
                            <div
                              className={
                                selected
                                  ? "text-gray-200 text-sm"
                                  : "text-gray-500 text-sm"
                              }
                            >
                              คนขับ:{" "}
                              <span className="font-medium">{car.driver}</span>
                            </div>
                          </div>
                          <div
                            className={[
                              "px-2 py-0.5 text-xs rounded-full border",
                              selected
                                ? "bg-white/10 border-white/20"
                                : "bg-green-50 text-green-700 border-green-200",
                            ].join(" ")}
                          >
                            ตรวจพบ {car.students} คน
                          </div>
                        </div>

                        <div className="mt-3 flex items-center gap-2">
                          <span
                            className={[
                              "inline-flex items-center gap-1 text-xs px-2 py-1 rounded-md border",
                              selected
                                ? "border-white/25 text-white"
                                : "border-gray-300 text-gray-600",
                            ].join(" ")}
                          >
                            <Video className="w-3.5 h-3.5" />
                            {selected ? "กำลังแสดงกล้อง" : "แตะเพื่อเปิดกล้อง"}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right column: camera panel */}
            <div className="min-h-[360px]">
              <div className="bg-white rounded-2xl shadow p-4 sm:p-5 h-full">
                <div className="mb-3 flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-800">
                    กล้อง{selectedCarId ? ` — รถ ${selectedCarId}` : ""}
                  </h2>
                </div>

                {selectedCarId ? (
                  <div className="rounded-xl overflow-hidden border bg-gray-100">
                    <CameraModal />
                  </div>
                ) : (
                  <div className="rounded-xl border border-dashed p-8 text-center text-gray-500">
                    เลือกรถทางฝั่งซ้ายเพื่อเปิดกล้อง
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
