

import { Bus, BadgeCheck } from "lucide-react";
import Map from '@/components/map';
export default function Home() {
    return (
        <div className="pb-16">
            <div className="sm:mt-24 md:mt-2 min-w-fit mx-4 h-1/2">
                <Map />
            </div>
            <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-2">
                <div className="flex items-center justify-between rounded-lg bg-yellow-800 p-4 text-white">
                    <div>
                        <div className="text-2xl font-bold sm:text-3xl">2 คน</div>
                        <div className="text-sm">นักเรียนที่ยังไม่ได้รับ</div>
                    </div>
                    <div className="text-3xl sm:text-4xl bg-yellow-900 p-3 rounded-full">
                        <Bus />
                    </div>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-green-800 p-4 text-white">
                    <div>
                        <div className="text-2xl font-bold sm:text-3xl">8 คน</div>
                        <div className="text-sm">นักเรียนบนรถ</div>
                    </div>
                    <div className="text-3xl sm:text-4xl bg-green-900 p-3 rounded-full">
                        <BadgeCheck />
                    </div>
                </div>
                
            </div>
        </div>
    );
}
