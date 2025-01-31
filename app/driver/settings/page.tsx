"use client";

import { useState } from 'react';
import { Camera } from 'lucide-react';
import Swal from "sweetalert2";
import Image from 'next/image';

export default function Home() {
        const handleSave = () => {
            Swal.fire({
                title: "บันทึกสำเร็จ!",
                text: "ข้อมูลของคุณถูกบันทึกเรียบร้อยแล้ว",
                icon: "success",
                confirmButtonText: "ตกลง"
            });
        };
    const [name, setName] = useState("นายณัฐสิทธิ์ มานะปิยวงศ์");
    const [phone, setPhone] = useState("099 999 9999");
    const [citizenId, setCitizenId] = useState("1111111111111");

    return (
        <div className="m-4">
            <div className="flex items-center gap-4 my-4 mt-10">
                        <div className="h-12 w-12 relative">
                            <Image
                                src="/poom.png"
                                alt="poom driver"
                                fill
                                className="object-cover rounded-full"
                            />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center justify-between">
                                <h3 className="font-medium">นายปุญญพัฒน์ กูลมนุญ</h3>
                                <div className="flex items-center gap-2 bg-green-200 text-green-800 rounded-full px-4 text-nowrap">
                                    กำลังให้บริการ
                                </div>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                ACT01 · กข 999
                            </p>
                        </div>
                    </div>
            <div/>
            <div className=" mx-auto pb-16 px-4">
            <h1 className="text-center mt-8 text-2xl font-semibold mb-8">การตั้งค่า</h1>
            
            {/* Profile Section */}
            <div className="flex flex-col items-center mb-8">
                <div className="relative">
                    <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">   
                            <Image 
                                src={'/tete.png'} 
                                alt="Profile" 
                                className="w-full h-full object-cover"
                                width={300}
                                height={300}

                            />
                    </div>
                    <button 
                        className="absolute bottom-0 right-0 bg-red-800 p-2 rounded-full text-white hover:bg-red-700"
                    >
                        <Camera className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Settings Form */}
            <div className="space-y-3 mb-8">
                {/* Name Setting */}
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        ชื่อ-นามสกุล
                    </label>
                    <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                {/* Phone Number Setting */}
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        เบอร์โทรศัพท์
                    </label>
                    <input
                        type="tel"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        pattern="[0-9]{10}"
                    />
                    <p className="mt-1 text-sm text-gray-500">ตัวอย่าง: 0812345678</p>
                </div>

                {/* Citizenship ID Setting */}
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        เลขใบขับขี่
                    </label>
                    <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        value={citizenId}
                        onChange={(e) => setCitizenId(e.target.value)}
                        pattern="[0-9]{8}" maxLength={8}
                    />
                    <p className="mt-1 text-sm text-gray-500">ตัวอย่าง: 12345678</p>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        รหัสรถ
                    </label>
                    <input
                        type="text"
                        className="bg-gray-100 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none "
                        value={"ACT01"} readOnly

                    />
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        ทำเบียนรถ
                    </label>
                    <input
                        type="text"
                        className="bg-gray-100 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none "
                        value={"กข 999"} readOnly

                    />
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        ยี่ห้อรถ
                    </label>
                    <input
                        type="text"
                        className="bg-gray-100 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none "
                        value={"Toyota"} readOnly

                    />
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        รุ่นรถ
                    </label>
                    <input
                        type="text"
                        className="bg-gray-100 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none "
                        value={"Commuter"} readOnly

                    />
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        สีรถ
                    </label>
                    <input
                        type="text"
                        className="bg-gray-100 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none "
                        value={"White"} readOnly

                    />
                </div>

                <button onClick={handleSave} className="w-full bg-gray-700 text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors">
                บันทึกข้อมูล
                </button>
            </div>
            </div>
        </div>
    );
}