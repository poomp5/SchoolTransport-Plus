'use client'

import { useTranslations } from 'next-intl'
import { Link, usePathname } from '@/i18n/navigation'
import { Cloudy, LayoutDashboard, LocateFixed, Headset, Info } from 'lucide-react'

export default function BottomNav() {
    const pathname = usePathname()
    const t = useTranslations('nav')

    const navItems = [
        { name: t('weather'), href: '/', icon: Cloudy },
        { name: t('overview'), href: '/overview', icon: LayoutDashboard },
        { name: t('busStatus'), href: '/status', icon: LocateFixed },
        { name: t('about'), href: '/about', icon: Info },
        { name: t('contact'), href: '/contact', icon: Headset },
    ]

    return (
        <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 md:hidden">
            <div className="grid h-full max-w-lg grid-cols-5 mx-auto">
                {navItems.map((item) => {
                    const Icon = item.icon
                    const isActive = pathname === item.href

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`whitespace-nowrap inline-flex flex-col items-center justify-center px-2 hover:bg-gray-50 ${isActive ? 'text-red-800' : 'text-gray-500'
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
