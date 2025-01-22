"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Users, Settings, Bell } from "lucide-react";

const AdminSidebar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    // Fix: Properly type the ref as HTMLDivElement
    const sidebarRef = useRef<HTMLDivElement | null>(null);

    // Navigation items array to avoid repetition
    const navigationItems = [
        { href: "/admin", icon: <Users className="h-5 w-5" />, label: "ภาพรวม", isActive: true },
        { href: "/admin/settings", icon: <Settings className="h-5 w-5" />, label: "ตั้งค่าระบบ" },
        { href: "/admin/users", icon: <Users className="h-5 w-5" />, label: "ตั้งค่าผู้ใช้งาน" },
        { href: "/admin/alerts", icon: <Bell className="h-5 w-5" />, label: "เหตุฉุกเฉิน" }
    ];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            // Fix: Type check for event.target and proper type assertion
            if (
                sidebarRef.current &&
                event.target instanceof Node &&
                !sidebarRef.current.contains(event.target)
            ) {
                setIsMobileMenuOpen(false);
            }
        };

        if (isMobileMenuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isMobileMenuOpen]);

    // Handle mobile menu toggle
    const toggleMobileMenu = () => setIsMobileMenuOpen(prev => !prev);

    return (
        <>
            {/* Mobile Menu Toggle Button */}
            <button
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                className="fixed right-4 top-4 z-50 rounded-lg bg-[#8B0000] p-2 text-white transition-colors hover:bg-[#6B0000] focus:outline-none focus:ring-2 focus:ring-white lg:hidden"
                onClick={toggleMobileMenu}
            >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            {/* Sidebar */}
            <div
                ref={sidebarRef}
                className={`fixed left-0 top-0 z-40 h-full w-64 transform bg-[#8B0000] shadow-lg transition-transform duration-300 ease-in-out lg:translate-x-0 ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                {/* Logo Section */}
                <div className="flex items-center gap-2 p-4 pt-4">
                    <div className="relative h-12 w-12 overflow-hidden rounded">
                        <Image
                            src="/logo.png"
                            width={300}
                            height={300}
                            alt="School Transport Plus Logo"
                            className="object-cover"
                        />
                    </div>
                    <div className="text-lg font-bold leading-tight text-white">
                        SCHOOL
                        <br />
                        TRANSPORT +
                    </div>
                </div>

                {/* Navigation Links */}
                <nav className="mt-8">
                    {navigationItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-4 px-6 py-4 text-white transition-colors ${item.isActive
                                    ? "bg-[#6B0000]"
                                    : "hover:bg-[#6B0000] focus:bg-[#6B0000]"
                                }`}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <div className="grid h-6 w-6 place-items-center">
                                {item.icon}
                            </div>
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </nav>
            </div>
        </>
    );
};

export default AdminSidebar;