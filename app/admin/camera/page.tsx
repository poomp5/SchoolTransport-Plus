"use client";

import AdminSidebar from "@/components/admin-sidebar";
import Thermal from "@/components/thermal";

export default function ThermalSeatPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6 gap-4">
    <AdminSidebar/>
      <div className="max-w-md w-full bg-white rounded-xl shadow p-6">
        <h1 className="text-xl font-bold text-gray-800 mb-4">
          ผังเบาะ • รถ ACT01
        </h1>

        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <Thermal />
          <p className="text-center text-sm mt-4 text-gray-600">
            กล้องจับภาพความร้อนแสดงว่า{" "}
            <span className="font-bold text-green-600">มีเด็ก 4 คน</span> บนรถ
          </p>
        </div>
      </div>
      <div className="max-w-md w-full bg-white rounded-xl shadow p-6">
        <h1 className="text-xl font-bold text-gray-800 mb-4">
          ผังเบาะ • รถ ACT01
        </h1>

        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <Thermal />
          <p className="text-center text-sm mt-4 text-gray-600">
            กล้องจับภาพความร้อนแสดงว่า{" "}
            <span className="font-bold text-green-600">มีเด็ก 4 คน</span> บนรถ
          </p>
        </div>
      </div>
    </div>
  );
}
