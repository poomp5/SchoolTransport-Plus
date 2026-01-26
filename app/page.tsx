"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Sun,
  Droplet,
  Cloud,
  CloudRain,
  Gauge,
  AlertTriangle,
  Navigation,
  Clock as ClockIcon,
  LayoutDashboard,
  Map as MapIcon,
  Radio,
  LifeBuoy,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import type { JSX } from "react";

interface WeatherData {
  WeatherForecasts?: Array<{
    forecasts: Array<{
      time: string;
      data: {
        tc: number;
        rh: number;
        cond: number;
      };
    }>;
    location: {
      name: string;
      lat: number;
      lon: number;
    };
  }>;
}

interface PMData {
  aqi: number;
  pm25: number;
}

export default function Home() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [pmData, setPmData] = useState<PMData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const response = await fetch(
        "/api/weather?lat=13.732924&lon=100.371428",
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setWeatherData(data);
    };

    const fetchPmData = async () => {
      const response = await fetch("/api/pmdata");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setPmData(data);
    };

    Promise.all([fetchWeatherData(), fetchPmData()])
      .catch((err) => {
        console.error("Fetch error:", err);
        setError(err instanceof Error ? err.message : "โหลดข้อมูลไม่สำเร็จ");
      })
      .finally(() => setLoading(false));
  }, []);

  const getCurrentWeather = () => {
    if (!weatherData?.WeatherForecasts?.[0]?.forecasts) return null;
    return weatherData.WeatherForecasts[0].forecasts[0];
  };

  const currentWeather = getCurrentWeather();
  const currentDate = new Date().toLocaleDateString("th-TH", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const pmCategory = useMemo(() => {
    if (!pmData?.pm25 && pmData?.pm25 !== 0) return null;
    const v = pmData.pm25;
    if (v <= 12) return { label: "ดีมาก", color: "text-emerald-600 bg-emerald-50" };
    if (v <= 35.4) return { label: "ปานกลาง", color: "text-amber-600 bg-amber-50" };
    if (v <= 55.4) return { label: "เริ่มมีผล", color: "text-orange-600 bg-orange-50" };
    if (v <= 150.4) return { label: "ไม่ดีต่อสุขภาพ", color: "text-red-600 bg-red-50" };
    return { label: "อันตราย", color: "text-rose-700 bg-rose-50" };
  }, [pmData?.pm25]);

  const humidity = currentWeather?.data.rh ?? null;
  const temp = currentWeather?.data.tc ?? null;

  const getWeatherIcon = (condition: number) => {
    switch (condition) {
      case 1:
        return <Sun className="w-12 h-12 text-yellow-500" />;
      case 2:
        return <Cloud className="w-12 h-12 text-yellow-400" />;
      case 3:
        return <Cloud className="w-12 h-12 text-gray-400" />;
      case 4:
        return <CloudRain className="w-12 h-12 text-blue-400" />;
      default:
        return <Cloud className="w-12 h-12 text-gray-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100 text-gray-900">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_20%,#8B0000_0,transparent_35%),radial-gradient(circle_at_80%_0%,#ef4444_0,transparent_28%)]" />
        <div className="relative container mx-auto px-4 py-10 md:py-14">
          <DesktopNav />
          <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-rose-100 text-rose-700 px-4 py-2 text-sm font-medium shadow-sm">
                <Gauge className="h-4 w-4" />
                School Transport • Air Quality
              </div>
              <div className="space-y-2">
                <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
                  รายงานคุณภาพอากาศวันนี้
                </h1>
                <p className="text-lg text-gray-600 flex items-center gap-2">
                  <ClockIcon className="h-4 w-4 text-rose-600" />
                  {currentDate}
                </p>
              </div>
              <p className="text-gray-600 max-w-2xl">
                ติดตามสภาพอากาศ PM2.5 และความชื้น
                ครบจบในหน้าเดียว พร้อมปุ่มเข้าสู่ระบบคนขับและหลังบ้าน.
              </p>
              <div className="flex gap-3 flex-wrap">
                <Link href="/admin" className="flex-1 min-w-[160px]">
                  <button className="w-full rounded-xl bg-[#8B0000] text-white py-3.5 px-4 font-semibold shadow-lg shadow-rose-200/60 hover:bg-[#750000] transition-colors">
                    เข้าระบบหลังบ้าน
                  </button>
                </Link>
                <Link href="/driver" className="flex-1 min-w-[160px]">
                  <button className="w-full rounded-xl border border-gray-300 bg-white text-gray-900 py-3.5 px-4 font-semibold hover:border-gray-400 transition-colors">
                    สำหรับคนขับรถ
                  </button>
                </Link>
              </div>
              {error && (
                <div className="inline-flex items-center gap-2 rounded-lg bg-amber-50 text-amber-800 px-3 py-2 text-sm">
                  <AlertTriangle className="h-4 w-4" />
                  {error}
                </div>
              )}
            </div>

            <div className="relative">
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-rose-100 blur-2xl" />
              <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white p-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-gray-500">กรุงเทพมหานคร</p>
                    <div className="flex items-baseline gap-2">
                      <p className="text-6xl font-semibold">
                        {temp !== null ? Math.round(temp) : "--"}°
                      </p>
                      <span className="text-gray-500 text-sm">
                        {humidity !== null ? `${Math.round(humidity)}% RH` : ""}
                      </span>
                    </div>
                  </div>
                  <div className="rounded-2xl bg-gray-50 p-3">
                    {currentWeather ? (
                      getWeatherIcon(currentWeather.data.cond)
                    ) : (
                      <Cloud className="w-12 h-12 text-gray-300" />
                    )}
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <StatChip
                    icon={<Droplet className="h-4 w-4" />}
                    label="ความชื้น"
                    value={humidity !== null ? `${Math.round(humidity)}%` : "--"}
                  />
                  <StatChip
                    icon={<Navigation className="h-4 w-4" />}
                    label="AQI"
                    value={pmData?.aqi ?? "--"}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-2xl bg-rose-100 text-rose-700 grid place-items-center">
                    <Droplet className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">ค่า PM2.5 ปัจจุบัน</p>
                    <p className="text-2xl font-semibold">
                      {pmData?.pm25 ?? "--"} µg/m³
                    </p>
                  </div>
                </div>
                {pmCategory && (
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${pmCategory.color}`}
                  >
                    {pmCategory.label}
                  </span>
                )}
              </div>
              <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                <SmallCard
                  title="อุณหภูมิ"
                  value={temp !== null ? `${Math.round(temp)}°C` : "--"}
                  icon={<Sun className="h-4 w-4 text-amber-500" />}
                />
                <SmallCard
                  title="ความชื้น"
                  value={humidity !== null ? `${Math.round(humidity)}%` : "--"}
                  icon={<Droplet className="h-4 w-4 text-blue-500" />}
                />
              </div>
              {loading && (
                <p className="text-sm text-gray-500 mt-4">กำลังโหลดข้อมูล...</p>
              )}
            </div>

            <div className="bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#1f2937] text-white rounded-3xl shadow-2xl overflow-hidden">
              <div className="p-6 md:p-8 flex flex-col gap-6">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-2xl bg-white/10 grid place-items-center">
                    <Image
                      src="/panda_mask.png"
                      alt="Panda"
                      width={64}
                      height={64}
                      className="object-cover"
                      priority
                    />
                  </div>
                  <div>
                    <p className="text-sm text-gray-300">คำแนะนำวันนี้</p>
                    <p className="text-xl font-semibold">ป้องกันฝุ่นละเอียด</p>
                  </div>
                </div>
                <div className="space-y-3 text-gray-200 text-sm leading-relaxed">
                  <p>• สวมหน้ากากเมื่ออยู่กลางแจ้ง โดยเฉพาะช่วงเช้า</p>
                  <p>• หลีกเลี่ยงการออกกำลังกายหนัก หากค่า PM2.5 เกิน 35 µg/m³</p>
                  <p>• ตรวจสอบค่า AQI ก่อนออกเดินทางและเลือกเส้นทางอากาศดีกว่า</p>
                </div>
                <div className="flex gap-3 flex-wrap">
                  <Link href="/status" className="flex-1 min-w-[150px]">
                    <button className="w-full rounded-xl bg-white text-gray-900 py-3 font-semibold hover:bg-gray-100 transition-colors">
                      ดูแผนที่รถรับส่งสด
                    </button>
                  </Link>
                  <Link href="/overview" className="flex-1 min-w-[150px]">
                    <button className="w-full rounded-xl border border-white/30 text-white py-3 font-semibold hover:bg-white/10 transition-colors">
                      สถิติการใช้งาน
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatChip({
  icon,
  label,
  value,
}: {
  icon: JSX.Element;
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-gray-50 px-3 py-3">
      <div className="h-9 w-9 rounded-xl bg-white shadow-sm grid place-items-center text-rose-600">
        {icon}
      </div>
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="text-sm font-semibold text-gray-900">{value}</p>
      </div>
    </div>
  );
}

function SmallCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: JSX.Element;
}) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4 flex items-start gap-3">
      <div className="h-9 w-9 rounded-xl bg-white shadow-sm grid place-items-center">
        {icon}
      </div>
      <div>
        <p className="text-xs text-gray-500">{title}</p>
        <p className="text-lg font-semibold text-gray-900">{value}</p>
      </div>
    </div>
  );
}

function QuickLink({
  href,
  icon,
  label,
  accent = false,
}: {
  href: string;
  icon: JSX.Element;
  label: string;
  accent?: boolean;
}) {
  return (
    <Link href={href} className="flex-1 min-w-[90px]">
      <button
        className={`w-full flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition-colors ${
          accent
            ? "bg-[#8B0000] text-white shadow-lg shadow-rose-200/60 hover:bg-[#750000]"
            : "bg-white border border-gray-200 text-gray-800 hover:border-gray-300"
        }`}
      >
        <span className="shrink-0">{icon}</span>
        <span>{label}</span>
      </button>
    </Link>
  );
}

function DesktopNav() {
  return (
    <header className="mb-10 hidden md:block">
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-xl border border-gray-200 grid place-items-center">
            <Image
              src="/logo.png"
              alt="School Transport Plus"
              width={44}
              height={44}
              className="object-cover w-full"
              priority
            />
          </div>
          <div>
            <p className="text-base font-semibold text-gray-900">School Transport +</p>
            <p className="text-xs text-gray-500">รถรับส่งครบจบในที่เดียว</p>
          </div>
        </Link>
        <div className="flex items-center whitespace-nowrap gap-2">
          <QuickLink
            href="/admin"
            icon={<LayoutDashboard className="h-4 w-4" />}
            label="หลังบ้าน"
            accent
          />
          <QuickLink
            href="/driver"
            icon={<LifeBuoy className="h-4 w-4" />}
            label="คนขับรถ"
          />
          <QuickLink
            href="/status"
            icon={<MapIcon className="h-4 w-4" />}
            label="Live Map"
          />
          <QuickLink
            href="/admin/rfid"
            icon={<Radio className="h-4 w-4" />}
            label="RFID Log"
          />
        </div>
      </div>
    </header>
  );
}
