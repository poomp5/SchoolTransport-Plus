'use client'

import { Link, usePathname, useRouter } from '@/i18n/navigation'
import { LayoutDashboard, Settings, Users } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'
import { useTransition } from 'react'

export default function BottomNavDriver() {
    const pathname = usePathname()
    const t = useTranslations('driver')
    const nav = useTranslations('nav')
    const locale = useLocale()
    const router = useRouter()
    const [isPending, startTransition] = useTransition()

    const navItems = [
        { name: t('overview'), href: '/driver', icon: LayoutDashboard },
        { name: t('students'), href: '/driver/student', icon: Users },
        { name: t('settings'), href: '/driver/settings', icon: Settings },
    ]

    const toggleLocale = () => {
        const next = locale === 'th' ? 'en' : 'th'
        startTransition(() => {
            router.replace(pathname, { locale: next })
        })
    }

    return (
        <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 md:hidden">
            <div className="grid h-full max-w-lg grid-cols-4 mx-auto">
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

                {/* Language toggle (EN/TH) */}
                <button
                    type="button"
                    onClick={toggleLocale}
                    disabled={isPending}
                    aria-label={nav('language')}
                    className="inline-flex flex-col items-center justify-center px-2 text-gray-500 hover:bg-gray-50"
                >
                    <span className="grid h-6 w-6 place-items-center rounded-full border border-gray-300 text-[10px] font-bold uppercase text-[#8B0000]">
                        {locale}
                    </span>
                    <span className="text-xs">{locale === 'th' ? 'EN' : 'TH'}</span>
                </button>
            </div>
        </div>
    )
}
