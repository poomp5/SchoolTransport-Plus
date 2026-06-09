"use client";

import { useLocale } from "next-intl";
import { useTransition } from "react";
import { Languages } from "lucide-react";
import { usePathname, useRouter } from "@/i18n/navigation";

// Floating EN/TH switcher shown only on mobile (top-right), so the bottom nav
// stays uncluttered. Desktop uses the switcher inside DesktopNav instead.
export default function MobileLangBar() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const switchTo = (next: "en" | "th") => {
    if (next === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  };

  return (
    <div className="fixed right-3 top-3 z-50 md:hidden">
      <div className="inline-flex items-center gap-1 rounded-full border border-gray-200 bg-white/95 p-0.5 text-xs font-semibold shadow-md backdrop-blur">
        <Languages className="ml-1.5 h-3.5 w-3.5 text-gray-400" />
        {(["en", "th"] as const).map((lng) => (
          <button
            key={lng}
            type="button"
            disabled={isPending}
            onClick={() => switchTo(lng)}
            className={`rounded-full px-2.5 py-1 uppercase transition-colors ${
              locale === lng
                ? "bg-[#8B0000] text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {lng}
          </button>
        ))}
      </div>
    </div>
  );
}
