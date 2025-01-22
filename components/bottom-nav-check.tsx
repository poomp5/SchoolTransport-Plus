"use client";
import { usePathname } from "next/navigation";
import BottomNav from "@/components/bottom-nav";
import BottomNavDriver from "./bottom-nav-driver";

export default function BottomNavCheck() {
    const pathname = usePathname();
    const isAdminRoute = pathname.startsWith("/admin");
    const isDriverRoute = pathname.startsWith("/driver");

    if (isDriverRoute) {
        return <BottomNavDriver />;
    }

    if (isAdminRoute) {
        return null;
    }

    return <BottomNav />;
}