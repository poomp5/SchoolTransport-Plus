"use client";

import { Camera, User, User2 } from "lucide-react";

export default function ThermalWithIcons() {
  return (
    <div className="relative w-[220px] h-[300px]">
      {/* SVG ผังที่นั่ง */}
      <svg
        viewBox="0 0 220 300"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0"
      >
        {/* พื้นรถ */}
        <rect
          x="0"
          y="0"
          width="220"
          height="300"
          rx="15"
          fill="#f8f8f8"
          stroke="#ccc"
        />

        {/* จุดกล้อง thermal */}
        <circle cx="200" cy="20" r="8" fill="#ff3b3b" />

        {/* เบาะโดยสาร */}
        <rect x="20" y="40" width="40" height="40" rx="5" fill="#e0e0e0" />
        <rect x="80" y="40" width="40" height="40" rx="5" fill="#e0e0e0" />
        <rect x="20" y="90" width="40" height="40" rx="5" fill="#e0e0e0" />
        <rect x="80" y="90" width="40" height="40" rx="5" fill="#e0e0e0" />
        <rect x="20" y="140" width="40" height="40" rx="5" fill="#e0e0e0" />
        <rect x="80" y="140" width="40" height="40" rx="5" fill="#e0e0e0" />
        <rect x="20" y="190" width="40" height="40" rx="5" fill="#e0e0e0" />
        <rect x="80" y="190" width="40" height="40" rx="5" fill="#e0e0e0" />
        <rect x="10" y="240" width="40" height="40" rx="5" fill="#e0e0e0" />
        <rect x="60" y="240" width="40" height="40" rx="5" fill="#e0e0e0" />
        <rect x="110" y="240" width="40" height="40" rx="5" fill="#e0e0e0" />

        {/* คนขับ */}
        <rect x="140" y="40" width="40" height="40" rx="5" fill="#999" />
        <text x="147" y="65" fontSize="10" fill="#fff">
          คนขับ
        </text>
      </svg>

      {/* Overlay icons */}
      <User2 className="absolute left-[30px] top-[45px] w-5 h-5 text-green-600" />
      <User className="absolute left-[90px] top-[95px] w-5 h-5 text-green-600" />
      <User className="absolute left-[90px] top-[195px] w-5 h-5 text-green-600" />
      <User2 className="absolute left-[20px] top-[245px] w-5 h-5 text-green-600" />

      {/* กล้อง thermal camera icon */}
      <Camera className="absolute left-[195px] top-[12px] w-3 h-3 text-white" />
    </div>
  );
}
