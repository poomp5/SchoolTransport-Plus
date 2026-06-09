"use client";
import { usePathname } from "@/i18n/navigation";
import BottomNav from "@/components/bottom-nav";
import BottomNavDriver from "./bottom-nav-driver";
import MobileLangBar from "@/components/mobile-lang-bar";

export default function BottomNavCheck() {
    const pathname = usePathname();
    const isAdminRoute = pathname.startsWith("/admin");
    const isDriverRoute = pathname.startsWith("/driver");

    // Admin already has its own top-right hamburger; skip the lang bar there.
    if (isAdminRoute) {
        return null;
    }

    return (
        <>
            <MobileLangBar />
            {isDriverRoute ? <BottomNavDriver /> : <BottomNav />}
        </>
    );
}