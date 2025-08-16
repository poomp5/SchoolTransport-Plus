"use client";
import Image from "next/image";
import Link from "next/link";

export function AlertTable() {
    return (
      <div className="w-full p-4 mb-4">
        <div>
          <div className="flex items-center gap-4 mb-4">
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
                  นักเรียน 11 คน
                </div>
              </div>
              <p className="text-sm text-muted-foreground">ACT01 · กข 999</p>
            </div>
          </div>
          <h3 className="font-medium mb-2">รถยางแตกระหว่างทาง</h3>
          <div className="flex gap-2">
            <button className="flex-1 bg-white hover:bg-gray-200 rounded-lg text-gray-900 py-1">
              ตรวจสอบ
            </button>
            <Link href={"tel:+66994376414"} className="flex-1 w-full">
              <button className="bg-red-800 hover:bg-red-900 rounded-lg text-white py-1 w-full">
                เริ่มการโทร
              </button>
            </Link>
          </div>
          <hr className="my-4" />
        </div>
        <div>
          <div className="flex items-center gap-4 mb-4">
            <div className="h-12 w-12 relative">
              <Image
                src="/cotton.png"
                alt="poom driver"
                fill
                className="object-cover rounded-full"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">นายศรัณยพงศ์ อัญญธนากร</h3>
                <div className="flex items-center gap-2 bg-green-200 text-green-800 rounded-full px-4 text-nowrap">
                  นักเรียน 10 คน
                </div>
              </div>
              <p className="text-sm text-muted-foreground">ACT03 · ฮว 456</p>
            </div>
          </div>
          <h3 className="font-medium mb-2">กำลังขับออกนอกเส้นทาง</h3>
          <div className="flex gap-2">
            <button className="flex-1 bg-white hover:bg-gray-200 rounded-lg text-gray-900 py-1">
              ตรวจสอบ
            </button>
            <Link href={"tel:+66982681988"} className="flex-1 w-full">
              <button className="bg-red-800 hover:bg-red-900 rounded-lg text-white py-1 w-full">
                เริ่มการโทร
              </button>
            </Link>
          </div>
          <hr className="my-4" />
        </div>
      </div>
    );
}