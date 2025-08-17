"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Image from "next/image";
import "leaflet/dist/leaflet.css";

type LatLng = [number, number];
type Bus = { id: string; pos: LatLng };

const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});

const DEFAULT_CENTER: LatLng = [13.7330125, 100.3702514]; // ตำแหน่งตั้งต้น (เช่น โรงเรียน/ศูนย์งาน)

const MapAdmin = () => {
  const [userLocation, setUserLocation] = useState<LatLng | null>(null);
  const [leaflet, setLeaflet] = useState<typeof import("leaflet") | null>(null);
  const [buses, setBuses] = useState<Bus[]>([]);

  // โหลด leaflet และขอตำแหน่งผู้ใช้
  useEffect(() => {
    import("leaflet").then((L) => setLeaflet(L));
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setUserLocation([pos.coords.latitude, pos.coords.longitude]),
        () => setUserLocation(null), // ปฏิเสธสิทธิ์ → ใช้ DEFAULT_CENTER
        { enableHighAccuracy: true, timeout: 8000 }
      );
    } else {
      setUserLocation(null);
    }
  }, []);

  // สร้างตำแหน่งรถ TIA01–TIA20 กระจายรอบจุดอ้างอิง (ผู้ใช้หรือดีฟอลต์)
  useEffect(() => {
    const center = userLocation ?? DEFAULT_CENTER;
    // สุ่มกระจายรัศมี 300–1200 เมตร
    const genAround = (
      c: LatLng,
      count = 20,
      minM = 300,
      maxM = 1200
    ): LatLng[] => {
      const [lat, lng] = c;
      const toDegLat = (m: number) => m / 111_320; // เมตร → องศาละติจูด
      const toDegLng = (m: number) =>
        m / (111_320 * Math.cos((lat * Math.PI) / 180)); // เมตร → องศาลองจิจูด (ชดเชยละติจูด)

      const points: LatLng[] = [];
      for (let i = 0; i < count; i++) {
        const r = minM + Math.random() * (maxM - minM); // เมตร
        const theta = Math.random() * 2 * Math.PI;
        const dx = r * Math.cos(theta);
        const dy = r * Math.sin(theta);
        points.push([lat + toDegLat(dy), lng + toDegLng(dx)]);
      }
      return points;
    };

    // สร้างครั้งเดียวต่อการเปลี่ยน center (เช่น ได้ตำแหน่งผู้ใช้แล้ว)
    const names = Array.from(
      { length: 20 },
      (_, i) => `TIA${String(i + 1).padStart(2, "0")}`
    );
    const pts = genAround(center, 20);
    setBuses(names.map((id, i) => ({ id, pos: pts[i] })));
  }, [userLocation]);

  if (!leaflet) return null;

  const userIcon = leaflet.icon({
    iconUrl: "/mylocation.png",
    iconSize: [50, 50],
  });
  // สร้าง icon เป็นตัวเลขแทนรถ
  // icon รถ + หมายเลขทับ
  // ไอคอนรถจาง + เลขคมชัดแบบ badge หรู ๆ
 // วงกลมพื้นแดง + ไอคอนรถสีขาว (จาง) + เลข 01–20 คมชัด
const makeBusIcon = (label: string) =>
  leaflet.divIcon({
    className: "tia-icon",
    html: `
      <div style="
        width: 48px; height: 48px;
        border-radius: 50%;
        background: #7b0f0f;
        display:flex; align-items:center; justify-content:center;
        position:relative;
        box-shadow:0 2px 6px rgba(0,0,0,.3);
      ">
        <!-- รถสีขาวจาง (ลายน้ำ) -->
        <svg viewBox="0 0 24 24" width="32" height="32"
             style="position:absolute; opacity:.25;">
          <path fill="white" d="M6 16c-.55 0-1 .45-1 1s.45 1 1 1 
            1-.45 1-1-.45-1-1-1zm12 0c-.55 0-1 
            .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zM6 
            4c-1.66 0-3 1.34-3 3v7c0 .55.45 1 1 1h1v2c0 
            .55.45 1 1 1h1c.55 0 1-.45 1-1v-2h8v2c0 
            .55.45 1 1 1h1c.55 0 1-.45 1-1v-2h1c.55 0 
            1-.45 1-1V7c0-1.66-1.34-3-3-3H6z"/>
        </svg>

        <!-- ข้อความหลัก -->
        <span style="
          font-size: 13px;
          font-weight: 900;
          color: #fff;
          z-index:1;
          text-shadow:0 1px 2px rgba(0,0,0,.6);
        ">TIA${label}</span>
      </div>
    `,
    iconSize: [48, 48],
    iconAnchor: [24, 24],
    popupAnchor: [0, -22],
  });


  const mapCenter = userLocation ?? DEFAULT_CENTER;

  return (
    <div className="relative w-full h-full">
      <MapContainer
        center={mapCenter}
        zoom={15}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom
        className="rounded-2xl"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="Thailand Innovation Awards 2025 | &copy openstreetmap.org"
        />

        {/* ตำแหน่งผู้ใช้ */}
        {userLocation && (
          <Marker position={userLocation} icon={userIcon}>
            <Popup>
              <div className="flex items-center">
                <Image
                  src="/mylocation.png"
                  alt="ตำแหน่งผู้ใช้"
                  className="w-6 h-6 mr-2"
                  width={30}
                  height={30}
                />
                <span className="kanit">ตำแหน่งของฉัน</span>
              </div>
            </Popup>
          </Marker>
        )}

        {buses.map((b) => (
          <Marker key={b.id} position={b.pos} icon={makeBusIcon(b.id.slice(3))}>
            <Popup>
              <span className="kanit">รถโรงเรียน {b.id}</span>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapAdmin;