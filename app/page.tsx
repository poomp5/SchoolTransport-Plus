"use client";

import { useEffect, useState } from "react";
import { Sun, Wind, Droplet, Cloud, CloudRain } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface WeatherData {
  WeatherForecasts?: Array<{
    forecasts: Array<{
      time: string;
      data: {
        tc: number;
        rh: number;
        rain: number;
        ws10m: number;
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

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch("/api/weather?lat=13.732924&lon=100.371428");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setError(error instanceof Error ? error.message : "Failed to fetch weather data");
      }
    };

    const fetchPmData = async () => {
      try {
        const response = await fetch('/api/pmdata');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPmData(data);
      } catch (error) {
        console.error("Error fetching PM2.5 data:", error);
        setError(error instanceof Error ? error.message : "Failed to fetch PM2.5 data");
      }
    };

    fetchWeatherData();
    fetchPmData();
  }, []);

  const getCurrentWeather = () => {
    if (!weatherData?.WeatherForecasts?.[0]?.forecasts) return null;
    return weatherData.WeatherForecasts[0].forecasts[0];
  };

  const currentWeather = getCurrentWeather();
  const currentDate = new Date().toLocaleDateString('th-TH', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',  
    year: 'numeric',
  });


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
    <div className="min-h-screen bg-gradient-to-t from-red-700 via-red-800 to-red-400 pb-24">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-white mb-8">
          <h1 className="text-3xl font-bold mb-2">รายงานคุณภาพอากาศ</h1>
          <p className="text-xl">{currentDate}</p>
        </div>
        <div className="max-w-2xl mx-auto">
          <div className="relative w-64 h-64 mx-auto mb-2">
            <div className="absolute inset-0 overflow-hidden">
              <Image
                src={'/panda_mask.png'}
                alt="Panda"
                width={256}
                height={256}
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* PM2.5 Value Display */}
          <div className="text-center mb-8">
            <div className="rounded-xl w-full py-4 mx-auto flex items-center justify-center">
              <div>
                <div className="text-4xl font-bold text-white">
                  {pmData?.pm25 || '--'} µg./m3.
                </div>
                <div className="mt-2 text-white/80">
                  {
                    pmData && pmData.pm25 ? (
                      <>
                        {pmData.pm25 <= 12
                          ? "ดี"
                          : pmData.pm25 <= 35.4
                            ? "ปานกลาง"
                            : pmData.pm25 <= 55.4
                              ? "ไม่ดีต่อสุขภาพสำหรับกลุ่มที่อ่อนไหว"
                              : pmData.pm25 <= 150.4
                                ? "ไม่ดีต่อสุขภาพ"
                                : pmData.pm25 <= 250.4
                                  ? "มีผลกระทบต่อสุขภาพ"
                                  : "อันตราย"}
                      </>
                    ) : (
                      <p className="text-sm text-gray-500">กำลังโหลดข้อมูล...</p>
                    )
                  }
                </div>
              </div>
            </div>
          </div>

          {/* Status Box */}
          <div className="bg-gray-800/90 text-white rounded-xl p-4 text-center mb-8">
            <p className="">
              งดการทำกิจกรรมกลางแจ้งทุกประเภท
              <br />
              สวมหน้ากากอนามัย N95 เมื่ออยู่กลางแจ้งตลอดเวลา
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md border border-1 border-gray-100">
            {error ? (
              <p className="text-red-500">{error}</p>
            ) : !currentWeather ? (
              <p>กำลังโหลดข้อมูล...</p>
            ) : (
              <>
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h2 className="text-6xl font-light mb-2">
                      {Math.round(currentWeather.data.tc) }°
                    </h2>
                    <p className="text-gray-500">กรุงเทพมหานคร</p>
                  </div>
                  <div className="mt-2">{getWeatherIcon(currentWeather.data.cond)}</div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* PM2.5 */}
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <Wind className="w-5 h-5 text-purple-500" />
                      <span className="text-sm text-gray-600">PM2.5</span>
                    </div>
                    {
                      pmData && pmData.pm25 ? (
                        <>
                          <p className="text-xl font-semibold">{pmData.pm25} µg/m³</p>
                          <p className="text-sm text-gray-500">
                            {pmData.pm25 <= 12
                              ? "ดี"
                              : pmData.pm25 <= 35.4
                                ? "ปานกลาง"
                                : pmData.pm25 <= 55.4
                                  ? "ไม่ดีต่อสุขภาพสำหรับกลุ่มที่อ่อนไหว"
                                  : pmData.pm25 <= 150.4
                                    ? "ไม่ดีต่อสุขภาพ"
                                    : pmData.pm25 <= 250.4
                                      ? "มีผลกระทบต่อสุขภาพ"
                                      : "อันตราย"}
                          </p>
                        </>
                      ) : (
                        <p className="text-sm text-white/90">กำลังโหลดข้อมูล...</p>
                      )
                    }
                  </div>
                  {/* UV Index */}
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <Sun className="w-5 h-5 text-yellow-500" />
                      <span className="text-sm text-gray-600">UV Index</span>
                    </div>
                    <p className="text-xl font-semibold">6 of 10</p>
                    <p className="text-sm text-gray-500">ปานกลาง</p>
                  </div>

                  {/* Humidity */}
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <Droplet className="w-5 h-5 text-blue-500" />
                      <span className="text-sm text-gray-600">ความชื้น</span>
                    </div>
                    <p className="text-xl font-semibold">{Math.round(currentWeather.data.rh)}%</p>
                    <p className="text-sm text-gray-500">
                      {currentWeather.data.rh > 70
                        ? "สูง"
                        : currentWeather.data.rh < 30
                          ? "ต่ำ"
                          : "ปานกลาง"}
                    </p>
                  </div>

                </div>
              </>
            )}
          </div>

          {/* Footer Links */}
          <div className="flex justify-between mt-8 gap-4">
            <Link href="/admin" className="w-full">
              <button className="w-full bg-white text-gray-800 py-3 rounded-lg hover:bg-gray-200 transition-colors">
                ระบบหลังบ้าน
              </button>
            </Link>
            <Link href="/driver" className="w-full">
              <button className="w-full bg-gray-800 text-white py-3 rounded-lg hover:bg-gray-700 transition-colors">
                สำหรับคนขับรถ
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}