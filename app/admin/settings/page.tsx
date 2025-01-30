"use client";

import AdminSidebar from "@/components/admin-sidebar";
import { useState } from "react";
import { Bus, User, Megaphone, CloudUpload } from "lucide-react";
import Swal from "sweetalert2";

export default function Settings() {
    const [activeTab, setActiveTab] = useState("bus");

    const handleSave = () => {
        Swal.fire({
            title: "บันทึกสำเร็จ!",
            text: "ข้อมูลของคุณถูกบันทึกเรียบร้อยแล้ว",
            icon: "success",
            confirmButtonText: "ตกลง"
        });
    };
    return (
        <div className="flex min-h-screen mb-24">
            <AdminSidebar />
            <div className="flex-1 lg:ml-64 mt-8 p-6">
                <h1 className="text-2xl font-semibold text-gray-600 mb-6">ตั้งค่าระบบ</h1>
                <div className="border-b flex">
                    <button className={`flex items-center gap-2 px-4 py-2 text-gray-700 whitespace-nowrap ${activeTab === "bus" ? "border-b-2 border-red-800 text-red-800" : "hover:text-red-800"}`} onClick={() => setActiveTab("bus")}>
                        <Bus className="w-5 h-5" /> รถรับส่ง
                    </button>
                    <button className={`flex items-center gap-2 px-4 py-2 text-gray-700 whitespace-nowrap ${activeTab === "driver" ? "border-b-2 border-red-800 text-red-800" : "hover:text-red-800"}`} onClick={() => setActiveTab("driver")}>
                        <User className="w-5 h-5" /> ผู้ขับขี่
                    </button>
                    <button className={`flex items-center gap-2 px-4 py-2 text-gray-700 whitespace-nowrap ${activeTab === "announcement" ? "border-b-2 border-red-800 text-red-800" : "hover:text-red-800"}`} onClick={() => setActiveTab("announcement")}>
                        <Megaphone className="w-5 h-5" /> ประชาสัมพันธ์
                    </button>
                </div>

                {/* Tab Content */}
                <div className="mt-4">
                    {activeTab === "bus" && (
                        <div className="border p-4 rounded-lg mb-4">
                            <input type="text" placeholder="ยี่ห้อรถ" className="w-full p-2 mb-2 border rounded" />
                            <input type="text" placeholder="รุ่นรถ" className="w-full p-2 mb-2 border rounded" />
                            <input type="text" placeholder="สีรถ" className="w-full p-2 mb-2 border rounded" />
                            <input type="text" placeholder="ทะเบียนรถ" className="w-full p-2 mb-2 border rounded" />
                            <input type="text" placeholder="รหัสรถ (ACT01)" className="w-full p-2 mb-2 border rounded" />
                            <input type="number" placeholder="จำนวนนักเรียน" className="w-full p-2 mb-2 border rounded" />
                            <button onClick={handleSave} className="w-full bg-gray-800 text-white py-2 rounded">บันทึกข้อมูล</button>
                        </div>
                    )}
                    {activeTab === "driver" && (
                        <div className="border p-4 rounded-lg mb-4">
                            <input type="text" placeholder="ชื่อ" className="w-full p-2 mb-2 border rounded" />
                            <input type="text" placeholder="นามสกุล" className="w-full p-2 mb-2 border rounded" />
                            <input type="number" placeholder="อายุ" className="w-full p-2 mb-2 border rounded" />
                            <select className="w-full p-2 mb-2 border rounded">
                                <option>ชาย</option>
                                <option>หญิง</option>
                                <option>อื่น ๆ</option>
                            </select>
                            <input type="text" placeholder="เลขใบขับขี่" className="w-full p-2 mb-2 border rounded" />
                            <button onClick={handleSave} className="w-full bg-gray-800 text-white py-2 rounded">บันทึกข้อมูล</button>
                        </div>
                    )}
                    {activeTab === "announcement" && (
                        <div className="border p-4 rounded-lg mb-4">
                            <textarea placeholder="ข้อความประกาศ" className="w-full p-2 mb-2 border rounded"></textarea>

                            <div className="flex items-center justify-center w-full">
                                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <CloudUpload className="text-gray-500 w-8 h-8"/>
                                        <p className="mb-2 text-sm text-gray-500 "><span className="font-semibold">คลิกเพื่ออัปโหลด</span> หรือลากไฟล์มาวาง</p>
                                        <p className="text-xs text-gray-500 ">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                    </div>
                                    <input id="dropzone-file" type="file" className="hidden" />
                                </label>
                            </div>
                            <button onClick={handleSave} className="mt-4 w-full bg-gray-700 text-white py-2 rounded-lg">บันทึกข้อมูล</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
