"use client";

import { useState } from "react";
import CameraModal from "@/components/camera-model";
import AdminSidebar from "@/components/admin-sidebar";

export default function CameraPage() {
  const [showCamera, setShowCamera] = useState(false);
  const [selectedCarId, setSelectedCarId] = useState<string | null>(null);

  const cars = [
    { id: "TIA01", driver: "นายปุญญพัฒน์ กูลมนุญ ", students: 4 },
    { id: "TIA02", driver: "นายศรัณยพงศ์ อัญญธนากร", students: 3 },
    { id: "TIA03", driver: "นายณัฐสิทธิ์ มานะปิยวงศ์", students: 5 },
  ];

  return (
    <div className="flex min-h-screen mb-24">
      <AdminSidebar />
      <div className="flex-1 lg:ml-64 md:mb-24">
        <main className="min-h-screen bg-gray-100 p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            ทดสอบกล้องบนรถแต่ละคัน
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cars.map((car) => (
              <div
                key={car.id}
                className="bg-white rounded-2xl shadow p-6 flex flex-col justify-between"
              >
                <div>
                  <h2 className="text-lg font-semibold text-gray-700 mb-2">
                    รถ {car.id}
                  </h2>
                  <p className="text-sm text-gray-500 mb-1">
                    คนขับ: <span className="font-medium">{car.driver}</span>
                  </p>
                  <p className="text-sm text-gray-500">
                    ตรวจพบ:{" "}
                    <span className="font-bold text-green-600">
                      {car.students} คน
                    </span>
                  </p>
                </div>

                <button
                  className="mt-4 px-4 py-2 bg-gray-800 text-white text-sm rounded-lg hover:bg-gray-700 transition"
                  onClick={() => {
                    setSelectedCarId(car.id);
                    setShowCamera(true);
                  }}
                >
                  เปิดกล้องของรถ {car.id}
                </button>
              </div>
            ))}
          </div>

          {showCamera && selectedCarId && (
            <CameraModal
              onClose={() => {
                setShowCamera(false);
                setSelectedCarId(null);
              }}
            />
          )}
        </main>
      </div>
    </div>
  );
}
