'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Settings, Users } from 'lucide-react'

export default function BottomNavDriver() {
    const pathname = usePathname()

    const navItems = [
        { name: 'ภาพรวม', href: '/driver', icon: LayoutDashboard },
        { name: 'นักเรียน', href: '/driver/student', icon: Users },
        { name: 'การตั้งค่า', href: '/driver/settings', icon: Settings },
    ]
    return (
        <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 md:hidden">
            <div className="grid h-full max-w-lg grid-cols-3 mx-auto">
                {navItems.map((item) => {
                    const Icon = item.icon
                    const isActive = pathname === item.href

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`whitespace-nowrap inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 ${isActive ? 'text-red-800' : 'text-gray-500'
                                }`}
                        >
                            <Icon className="w-6 h-6" />
                            <span className="text-xs">{item.name}</span>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}
