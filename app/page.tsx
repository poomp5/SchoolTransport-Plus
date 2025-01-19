"use client";

import { useEffect, useState } from "react";
import { Sun, CloudRain, Cloud, Wind, Droplet } from "lucide-react";

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
        const response = await fetch("/api/weather?lat=13.7563&lon=100.5018");
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
        console.log("PM2.5 API response:", data); // Log the full response to inspect the structure

        // Directly extract the values since the structure is simpler
        const aqi = data.aqi;
        const pm25 = data.pm25;

        if (aqi !== undefined && pm25 !== undefined) {
          setPmData({
            aqi,
            pm25,
          });
        } else {
          throw new Error("PM2.5 data is missing required fields.");
        }
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
        {/* Header Section */}
        <div className="mb-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="bg-red-800 text-white p-6 rounded-xl flex flex-col justify-center items-start">
              <h1 className="text-xl md:text-3xl font-bold mb-2 whitespace-break-spaces">
                ยินดีต้อนรับสู่ School Transport Plus
              </h1>
              <p className="text-sm md:text-base">
                แอปพลิเคชันที่จะยกระดับการเดินทาง ครบ-จบ-ในที่เดียว
              </p>
            </div>
            <div className="bg-gray-100 p-6 rounded-xl flex flex-col justify-center items-start">
              <h2 className="text-xl md:text-3xl font-semibold mb-2 text-gray-700">
                ข้อมูลสภาพอากาศและคุณภาพอากาศ
              </h2>
              <p className="text-sm md:text-base text-gray-700">
                รับข้อมูลสภาพอากาศและคุณภาพอากาศแบบเรียลไทม์จาก กรมอุตุนิยมวิทยา (tmd.go.th) และ World Air Pollution (waqi.info)
              </p>
            </div>
          </div>
        </div>

        {/* Weather and PM2.5 Section */}
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
                <div className="mt-2">{getWeatherIcon(currentWeather.data.cond)}</div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                        <p className="text-sm text-gray-500">กำลังโหลดข้อมูล...</p>
                      )
                    }
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
