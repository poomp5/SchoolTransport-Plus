"use client";

import React from "react";

interface WeatherProps {
    weatherData: {
        WeatherForecasts: {
            forecasts: {
                data: {
                    tc: number;
                    cond: number;
                    rh: number;
                };
                time: string;
            }[];
        }[];
    } | null;
    error: string | null;
    getWeatherIcon: (condition: number) => React.JSX.Element;
}

const Weather: React.FC<WeatherProps> = ({ weatherData, error, getWeatherIcon }) => {
    const getCurrentWeather = () => {
        if (!weatherData?.WeatherForecasts?.[0]?.forecasts) return null;
        return weatherData.WeatherForecasts[0].forecasts[0];
    };

    const getForecast = () => {
        if (!weatherData?.WeatherForecasts?.[0]?.forecasts) return [];
        return weatherData.WeatherForecasts[0].forecasts.slice(1, 6);
    };

    const currentWeather = getCurrentWeather();
    const forecast = getForecast();

    return (
        <div className="p-4 bg-gray-50 min-h-screen">
            <div className="bg-white rounded-xl p-6 shadow-sm">
                {error ? (
                    <p className="text-red-500">{error}</p>
                ) : !currentWeather ? (
                    <p>กำลังโหลดข้อมูล...</p>
                ) : (
                    <>
                        <div className="flex justify-between items-start mb-8">
                            <div>
                                <h2 className="text-6xl font-light mb-2">{Math.round(currentWeather.data.tc)}°</h2>
                                <p className="text-gray-500">กรุงเทพมหานคร</p>
                            </div>
                            <div className="mt-2">{getWeatherIcon(currentWeather.data.cond)}</div>
                        </div>

                        <div className="grid grid-cols-5 gap-2 mb-8">
                            {forecast.map((item, index) => (
                                <div key={index} className="text-center p-2 bg-gray-50 rounded-lg">
                                    <p className="text-xs text-gray-500 mb-1">
                                        {new Date(item.time).toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit" })}
                                    </p>
                                    {getWeatherIcon(item.data.cond)}
                                    <p className="text-sm font-medium mt-1">{Math.round(item.data.tc)}°</p>
                                    <p className="text-xs text-gray-500">{item.data.rh}%</p>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Weather;