"use client";

import { useState } from "react";
import Image from 'next/image';
import { MapPin, Navigation, Clock } from "lucide-react";

const StatusCard = () => {
    const [isWaiting, setIsWaiting] = useState(false);
    return (
        <div className="max-w-2xl md:max-w-full mx-auto min-h-screen flex flex-col">
            {/* Mobile-like container */}
            <div className="bg-white h-full shadow-lg my-4 md:my-8 rounded-2xl">
                {/* Header */}
                <div className="p-6 border-b">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                            <Image
                                src={'/poom_suit.png'}
                                alt="Driver poom suit"
                                width={50}
                                height={50}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div>
                            <h1 className="text-gray-700 text-lg font-semibold">ปุญญพัฒน์ กูลมนุญ</h1>
                            <p className="text-gray-600 text-sm">โรงเรียนอัสสัมชัญธนบุรี</p>
                        </div>
                    </div>
                </div>
                <div className="p-6">
                    <div className="flex items-center justify-between my-8">
                        <div className="flex-1 relative">
                            <div className="h-1 bg-green-500"></div>
                            <div className="absolute -top-2 left-0 w-4 h-4 rounded-full bg-green-500"></div>
                            <p className="absolute -top-8 left-0 text-xs md:text-sm text-gray-600 whitespace-nowrap">ออกเดินทาง</p>
                        </div>
                        <div className="flex-1 relative">
                            <div className="h-1 bg-green-500"></div>
                            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-green-500"></div>
                            <p className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs md:text-sm text-gray-600 whitespace-nowrap">รับนักเรียนคนอื่น</p>
                        </div>
                        <div className="flex-1 relative">
                            <div className="h-1 bg-green-500"></div>
                            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-green-500"></div>
                            <p className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs md:text-sm text-gray-600 whitespace-nowrap">อยู่ในเส้นทาง</p>
                        </div>
                        <div className="flex-1 relative">
                            <div className="h-1 bg-gray-300"></div>
                            <div className="absolute -top-2 right-0 w-4 h-4 rounded-full bg-gray-300"></div>
                            <p className="absolute -top-8 right-0 text-xs md:text-sm text-gray-600 whitespace-nowrap">ถึงจุดหมาย</p>
                        </div>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <Clock className="w-5 h-5 text-gray-600" />
                                <span className="text-gray-600">รถกำลังจะมารับในอีก</span>
                            </div>
                            <div className="text-xl font-semibold text-gray-600">5 นาที</div>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <Navigation className="w-5 h-5 text-gray-600" />
                                <span className="text-gray-600">ระยะทาง</span>
                            </div>
                            <div className="text-xl font-semibold text-gray-600">2.4 Km</div>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <MapPin className="w-5 h-5 text-gray-600" />
                                <span className="text-gray-600">เวลาเดินทาง</span>
                            </div>
                            <div className="text-xl font-semibold text-gray-600">20 นาที</div>
                        </div>
                    </div>
                    <button
                        className={`w-full mt-6 py-4 rounded-xl font-medium ${isWaiting ? 'bg-gray-200 text-gray-600 hover:bg-gray-300' : 'bg-green-700 text-white'}`}
                        onClick={() => setIsWaiting(!isWaiting)}
                    >
                        {isWaiting ? 'ฉันกำลังยืนรอรถรับส่ง' : 'ฉันกำลังยืนรอรถรับส่ง'}
                    </button>
                    <p className="mt-2 text-center text-gray-500 text-sm text-nowrap">เมื่อปุ่มเป็นสีเขียว หมายความว่าคุณพร้อมขึ้นรถรับส่งแล้ว</p>
                </div>
            </div>
        </div>
    );
};

export default StatusCard;