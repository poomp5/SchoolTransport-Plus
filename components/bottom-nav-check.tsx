"use client";

import { usePathname } from "next/navigation";
import BottomNav from "@/components/bottom-nav";

export default function BottomNavCheck() {
    const pathname = usePathname();
    const isAdminRoute = pathname.startsWith("/admin");

    return !isAdminRoute ? <BottomNav /> : null;
}
