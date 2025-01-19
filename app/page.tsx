"use client";

import { useEffect, useState } from "react";
import { Sun, CloudRain, Cloud, Wind, Droplet, Info } from "lucide-react";
// TMD API interfaces
interface WeatherData {
  WeatherForecasts?: Array<{
    forecasts: Array<{
      time: string;
      data: {
        tc: number; // temperature
        rh: number; // relative humidity
        rain: number;
        ws10m: number; // wind speed at 10m
        cond: number; // weather condition
      };
    }>;
    location: {
      name: string;
      lat: number;
      lon: number;
    };
  }>;
  station?: {
    province: string;
  };
}

interface PMData {
  aqi: number;
  pm25: number;
}

export default function Home() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null); // Define weatherData state
  const [pmData, setPmData] = useState<PMData | null>(null); // Define pmData state
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          "https://data.tmd.go.th/nwpapi/v1/forecast/location/daily/at?lat=13.7563&lon=100.5018",
          {
            headers: {
              accept: "application/json",
              authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`, // Use API token from environment variable
            },
          }
        );

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
        const response = await fetch(
          `https://api.waqi.info/feed/geo:13.7563;100.5018/?token=${process.env.NEXT_PUBLIC_PM_API_TOKEN}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setPmData({
          aqi: data.data.aqi,
          pm25: data.data.iaqi.pm25.v,
        });
      } catch (error) {
        console.error("Error fetching PM2.5 data:", error);
        setError(error instanceof Error ? error.message : "Failed to fetch PM2.5 data");
      }
    };

    fetchWeatherData();
    fetchPmData();
  }, []);

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

  const getCurrentWeather = () => {
    if (!weatherData?.WeatherForecasts?.[0]?.forecasts) return null;
    return weatherData.WeatherForecasts[0].forecasts[0];
  };

  const currentWeather = getCurrentWeather();
  return (
    <div className="pb-16">
      <div className="p-4 bg-gray-50 min-h-screen">
        <div className="mb-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="bg-red-800 text-white p-6 rounded-xl flex flex-col justify-center items-start">
              <h1 className="text-xl md:text-3xl font-bold mb-2 whitespace-break-spaces">ยินดีต้อนรับสู่ School Transport Plus</h1>
              <p className="text-sm md:text-base">แอปพลิเคชันที่จะยกระดับการเดินทาง ครบ-จบ-ในที่เดียว</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-xl flex flex-col justify-center items-start">
              <h2 className="text-xl md:text-3xl font-semibold mb-2">ข้อมูลสภาพอากาศและคุณภาพอากาศ</h2>
              <p className="text-sm md:text-base text-gray-700">รับข้อมูลสภาพอากาศและคุณภาพอากาศแบบเรียลไทม์จาก กรมอุตุนิยมวิทยา (tmd.go.th) และ World Air Pollution (waqi.info)</p>
            </div>
          </div>
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
                    {Math.round(currentWeather.data.tc)}°
                  </h2>
                  <p className="text-gray-500">กรุงเทพมหานคร</p>
                </div>
                <div className="mt-2">
                  {getWeatherIcon(currentWeather.data.cond)}
                </div>
              </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <Sun className="w-5 h-5 text-yellow-500" />
                      <span className="text-sm text-gray-600">UV Index</span>
                    </div>
                    <p className="text-xl font-semibold">6 of 10</p>
                    <p className="text-sm text-gray-500">ปานกลาง</p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <Droplet className="w-5 h-5 text-blue-500" />
                      <span className="text-sm text-gray-600">ความชื้น</span>
                    </div>
                    <p className="text-xl font-semibold">{Math.round(currentWeather.data.rh)}%</p>
                      <p className="text-sm text-gray-500">
                      {currentWeather.data.rh > 70 ? "สูง" : currentWeather.data.rh < 30 ? "ต่ำ" : "ปานกลาง"}
                      </p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <Wind className="w-5 h-5 text-purple-500" />
                      <span className="text-sm text-gray-600"> PM2.5</span>
                    </div>
                    {pmData ? (
                      <>
                        <p className="text-xl font-semibold">{pmData.pm25} µg/m³</p>
                        <p className="text-sm text-gray-500">
                          {pmData.pm25 <= 12 ? "ดี" : pmData.pm25 <= 35.4 ? "ปานกลาง" : pmData.pm25 <= 55.4 ? "ไม่ดีต่อสุขภาพสำหรับกลุ่มที่อ่อนไหว" : pmData.pm25 <= 150.4 ? "ไม่ดีต่อสุขภาพ" : pmData.pm25 <= 250.4 ? "มีผลกระทบต่อสุขภาพ" : "อันตราย"}
                        </p>
                      </>
                    ) : (
                      <p className="text-sm text-gray-500">กำลังโหลดข้อมูล...</p>
                    )}
                  </div>
                </div>
                <div className="text-gray-400 p-4 rounded-xl col-span-3 text-center">
                   อัพเดตเวลา {new Date().toLocaleString('th-TH', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' , hour12: false })} น.
                  <div className="relative group inline-block">
                    <span className="text-sm text-gray-500 cursor-pointer"><Info size={16}/></span>
                    <div className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 md:whitespace-nowrap">
                      ข้อมูล API Realtime จาก TMD (กรมอุตุนิยมวิทยา) และ waqi.info
                    </div>
                  </div>
                </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
