"use client";

import { useTranslations } from "next-intl";
import Map from "@/components/map";
import StatusCard from '@/components/status-card';

export default function Page () {
    const t = useTranslations("status");
    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <h1 className="text-2xl font-semibold mb-4 text-gray-800">{t("title")}</h1>
            <div className="h-[500px]">
                <Map />
                <StatusCard />
            </div>
        </div>
    );
};
